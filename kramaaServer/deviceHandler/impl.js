var db = require('../database/models/index');
const web3Handler = require('../web3Handler/ropstenHandler');
var Device = db.device;
module.exports = {
  addNewDevice: (deviceURN, transactionHash) => {
    Device.create({
      urn: deviceURN,
      transactionHash: transactionHash
    })
  }
}
