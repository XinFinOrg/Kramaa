var db = require('../database/models/index');
const web3Handler = require('../web3Handler/ropstenHandler');
var Project = db.project;
module.exports = {
  getProjectInfo: (req, res) => {
    Project.findOne({
      where: {
        uniqueId: req.body.projectID
      }
    }).then(project => {
      web3Handler.checkTotalTokenSupply(project.tokenContractAddress).then(totalSupply=> {
        res.send({project: project, totalSupply: totalSupply});
      })
    })
  },

  mintNewToken: (req, res) => {
    Project.findOne({
      where: {
        name: req.body.projectName
      }
    }).then(project => {
      web3Handler.mintNewToken(
        "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
        req.body.tokenIDFrom,
        req.body.tokenIDTo,
        JSON.stringify(req.body.tokenURI),
        req.body.deviceURN,
        project.tokenContractAddress,
        req.body.projectName
      );
    })
  },

  getTokenSupply: (req, res) => {
    Project.findOne({
      where: {
        name: req.body.projectName
      }
    }).then(project => {
      web3Handler.checkTotalTokenSupply(project.tokenContractAddress).then(totalSupply=> {
        res.send({totalSupply: totalSupply});
      })
    })
  }
}
