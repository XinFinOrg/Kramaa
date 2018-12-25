var db = require('../database/models/index');
var Client = db.client;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var configAuth = require('../config');
// const Web3 = require('web3');
// const web3 = new Web3();
// const mailer = require("../emailer/impl");

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = {
  userOnboarding: (req, res) => {
    var email = req.query.email;
    console.log(email);
    res.send({"otp": "1234"});
  },

  userRegistration: (req, res) => {
    console.log(req.body);
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
        var newClient = new Object();
        // set the user's local credentials
        newClient.email = req.body.email;
        newClient.password = generateHash(req.body.password);
        Client.create(newClient).then(client => {
          console.log("New User");
          res.send({"status": "New User"});
        });
      }
    });
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
  }
}
