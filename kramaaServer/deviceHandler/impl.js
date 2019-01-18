var db = require('../database/models/index');
const web3Handler = require('../web3Handler/ropstenHandler');
var Device = db.device;
module.exports = {
  addNewDevice: (deviceURN, transactionHash) => {
    Device.create({
      urn: deviceURN,
      transactionHash: transactionHash
    })
  },

  deviceList: (req, res) => {
    req.client.getOrganization().then(organization => {
      organization.getDevices().then(devices => {
        res.send({
          deviceList: devices
        });
      });
    });
  }
}
