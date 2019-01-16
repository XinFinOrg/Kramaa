var db = require('../database/models/index');
var Client = db.client;
var Organization = db.organization;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var configAuth = require('../config');
var web3Handler = require('../web3Handler/ropstenHandler');
const mailer = require("../mailer/impl");
let Promise = require('bluebird');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = {
  userOnboarding: (req, res) => {
    var email = req.body.email;
    console.log(email);
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(client){
        console.log("User already exists");
        res.send({"status": "User already exists"});
      }
      else {
        module.exports.onboardNewClient(email)
        .then(createdClient => {
          mailer.sendConfirmationOTP(createdClient.email, createdClient.verificationOTP);
          res.send({"status": "Onboarded User", "otp": "true"});
        });
      }
    });
  },

  verifyOTP: (req, res) => {
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(client.verificationOTP==req.body.otp){
        res.send({"status": "true"});
      }
      else {
        res.send({"status": "false"});
      }
    });
  },

  userRegistration: (req, res) => {
    console.log(req.body);
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(client && client.emailVerified){
        console.log("User already exists");
        res.send({"status": "User already exists"});
      }
      else {
        Promise.all([module.exports.createNewOrganization(req), module.exports.createNewClient(req.body.firstName, req.body.lastName, req.body.email, req.body.password), web3Handler.generateEthAddress()])
        .then(([createdOrganization, createdClient, createdEthAddress]) => {
          createdOrganization.addClient(createdClient);
          createdOrganization.setUserCurrencyAddress(createdEthAddress);
          res.send({"status": "New User"});
        });
      }
    });
  },

  invitedUserInfo: (req, res) => {
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      client.getOrganization().then(organization => {
        res.send(organization);
      })
    });
  },

  inviteUserRegistration: (req, res) => {
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(client){
        client.password = generateHash(req.body.password);
        client.firstName = req.body.firstName;
        client.lastName = req.body.lastName;
        client.save().then(client => {
          res.send({"status": "User registered"});
        })
      } else {
        res.send({"status": "Uninvited User"})
      }
    })
  },

  userLogin: (req, res) => {
    Client.findOne({
      where: {
        email: req.body.email
      }
    }).then(client => {
      if(!client){
        res.send({"status": "No such user"});
      } else if (!bcrypt.compareSync(req.body.password, client.password)){
        res.send({"status": "Wrong password"});
      } else {
        const token = jwt.sign({
          clientId: client.uniqueId,
        }, configAuth.jwtAuthKey.secret, {
            expiresIn: configAuth.jwtAuthKey.tokenLife
          });
        //Send back the token to the user
        // res.cookie('token', token, {
        //   expire: 360000 + Date.now()
        // });
        res.send({"status": "Yay", "clientToken": token})

      }
    })
  },

  onboardNewClient: (email) => {
    return new Promise(async function (resolve, reject) {
      var newClient = new Object();
      // set the user's local credentials
      newClient.email = email;
      newClient.verificationOTP = Math.floor(Math.random() * 9999);
      Client.create(newClient).then(client => {
        resolve(client);
      });
    });
  },

  createNewClient: (firstName, lastName, email, password) => {
    return new Promise(async function (resolve, reject) {
      Client.findOne({
        where: {
          email: email
        }
      }).then(client => {
        // set the user's local credentials
        client.firstName = firstName;
        client.lastName = lastName;
        client.emailVerified = true;
        client.password = generateHash(password);
        client.save().then(client => {
          resolve(client);
        });
      });
    });
  },

  createNewOrganization: (req) => {
    return new Promise(async function (resolve, reject) {
      let newOrganization = new Object();
      newOrganization.organizationName = req.body.organizationName;
      newOrganization.addressLine1 = req.body.addressLine1;
      newOrganization.addressLine2 = req.body.addressLine2;
      newOrganization.addressLine3 = req.body.addressLine3;
      Organization.create(newOrganization).then(createdOrganization => {
        resolve(createdOrganization);
      });
    });
  }

}
