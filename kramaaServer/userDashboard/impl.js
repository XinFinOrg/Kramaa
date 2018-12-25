var db = require('../database/models/index');
var Client = db.client;
// const Web3 = require('web3');
// const web3 = new Web3();
// const mailer = require("../emailer/impl");

module.exports = {
  projectList: (req, res) => {
    req.client.getProjects().then(projects => {
      console.log(projects);
      res.send({"client": req.client, "projects": projects});
    })
  }
}
