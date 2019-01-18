var db = require('../database/models/index');
var Client = db.client;
var Project = db.project;
var Thing = db.thing;
const mailer = require("../mailer/impl");
const userOnboarding = require("../userOnboarding/impl");
const contractHandler = require('../contractHandler/impl');
const web3Handler = require('../web3Handler/ropstenHandler');

module.exports = {
  thingList: (req, res) => {
    req.client.getOrganization().then(organization => {
      organization.getThings().then(things => {
        res.send({
          "client": req.client,
          "things": things,
          "organization": organization
        });
      });
    });
  },

  getThingInfo: (req, res) => {
    Thing.findOne({
      where: {
        uniqueId: req.body.thingID
      }
    }).then(thing=> {
      res.send({
        thing: thing
      });
    })
  }
}
