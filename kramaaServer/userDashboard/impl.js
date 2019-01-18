var db = require('../database/models/index');
var Client = db.client;
var Project = db.project;
var Thing = db.thing;
const mailer = require("../mailer/impl");
const userOnboarding = require("../userOnboarding/impl");
const contractHandler = require('../contractHandler/impl');
const web3Handler = require('../web3Handler/ropstenHandler');

module.exports = {

  getUserInfo: (req, res) => {
    res.send({
      user: req.client
    })
  },

  projectList: (req, res) => {
    req.client.getOrganization().then(organization => {
      organization.getProjects().then(projects => {
        res.send({
          "client": req.client,
          "projects": projects,
          "organization": organization
        });
      });
    });
  },

  createProject: (req, res) => {
    contractHandler.createERC721Contract(req.body.tokenName, req.body.tokenSymbol).then(contractCode => {
      contractHandler.compileContract(contractCode).then(compiledContract => {
        web3Handler.deployContract(compiledContract.abi, compiledContract.byteCode).then(deploymentInformation => {
          console.log("Deployment info is ", deploymentInformation);
          web3Handler.addNewProject(
            deploymentInformation.contractAddress,
            req.body.name,
            req.body.name,
            req.body.tokenName,
            req.body.tokenSymbol,
            "xinfin"
          );
          let newProject = new Object();
          newProject.name = req.body.name;
          newProject.industry = req.body.industry;
          newProject.subIndustry = req.body.subIndustry;
          newProject.tokenName = req.body.tokenName;
          newProject.tokenSymbol = req.body.tokenSymbol;
          newProject.tokenContractCode = contractCode;
          newProject.tokenContractABI = compiledContract.abi;
          newProject.tokenContractBytecode = compiledContract.byteCode;
          newProject.tokenContractAddress = deploymentInformation.contractAddress;
          newProject.tokenContractTxHash = deploymentInformation.transactionHash;
          Project.create(newProject).then(project => {
            req.client.getOrganization().then(organization => {
              organization.addProject(project);
              res.send({
                "status": "Project created successsfully",
                "project": project
              });
            });
          });
        });
      })
    })
  },

  createThing: (req, res) => {
    req.client.getOrganization().then(organization=> {
       Thing.create({
         name: req.body.thingName,
         description: req.body.thingDescription,
         brand: req.body.thingBrand,
         uri: req.body.thingAttributes
       }).then(thing => {
         organization.addThing(thing);
         res.send({status: true, message: "Thing created successsfully"})
       })
    })
  },

  inviteColleague: (req, res) => {
    req.client.getOrganization().then(createdOrganization => {
      Client.create({
        email: req.body.inviteEmail
      }).then(client => {
        createdOrganization.addClient(client);
        mailer.invitationMailer(req, req.body.inviteEmail);
        res.send({"status": "Invitation sent successsfully"});
      })
    });
  },

  getCounts: (req, res) => {
    req.client.getOrganization().then(organization => {
      organization.getProjects().then(projects => {
        organization.getDevices().then(devices => {
          organization.getThings().then(things => {
            res.send({
              "organization": organization,
              "client": req.client,
              "projectCount": projects.length,
              "deviceCount": devices.length,
              "thingsCount": things.length
            });
          })
        })
      });
    });
  }
}
