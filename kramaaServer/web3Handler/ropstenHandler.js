var db = require('../database/models/index');
var client = db.client;
var Address = db.userCurrencyAddress;
var Device = db.device;
var Project = db.project;
let Promise = require('bluebird');
const Web3 = require('web3');
var config = require('../config');
var ws_provider = config.testnetEndpoint;
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider(ws_provider);
web3.setProvider(provider);
// providerHandler(provider, ws_provider, web3);
var tokenABI = config.tokenABI;
var myContract = new web3.eth.Contract(tokenABI);

const registryABI = require('../contractHandler/Registry/RegistryContractABI');
module.exports = {

  deployContract: (abi, bytecode) => {
    return new Promise(async (resolve, reject) => {
      // myContract.deploy({
      // data: '0x'+ bytecode,
      // })
      // .send({
      //   from: config.testnetFaucetAddress,
      //   gas: 4700000,
      //   gasPrice: '30000000000'
      // }, function(error, transactionHash){
      // })
      // .on('error', function(error){
      //   reject(error);
      // })
      // .on('transactionHash', function(transactionHash){
      // })
      // .on('receipt', function(receipt){
      //   console.log(receipt.contractAddress) // contains the new contract address
      // })
      // .once('confirmation', function(confirmationNumber, receipt){
      //   console.log(confirmationNumber, receipt);
      //   resolve({contractAddress: receipt.contractAddress, transactionHash: receipt.transactionHash})
      // })
      // .then(function(newContractInstance){
      //   // console.log(newContractInstance.options.address) // instance with the new contract address
      // });
      let gasPrice = await web3.eth.getGasPrice() * 1.40;
      var transaction = {
        from: config.testnetFaucetAddress,
        data: '0x'+bytecode,
        gas: 4700000,
        gasPrice: gasPrice
      };

      web3.eth.estimateGas(transaction).then(gasLimit => {
        transaction["gasLimit"] = gasLimit;
        web3.eth.accounts.signTransaction(transaction, config.testnetFaucetPrivateKey).then(result => {
          web3.eth.sendSignedTransaction(result.rawTransaction).then(receipt => {
            resolve({contractAddress: receipt.contractAddress, transactionHash: receipt.transactionHash})
          });
        });
      });

    });
  },

  addNewProject: (contractAddress, name, description, tokenName, tokenSymbol, organizationName) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress);
      let gasPrice = await web3.eth.getGasPrice() * 1.40;
      var transaction = {
        "to": config.registryContractAddress,
        "data": registryContractInstance.methods.addNewProject(
          contractAddress,
          web3.utils.stringToHex(name),
          web3.utils.stringToHex(description),
          web3.utils.stringToHex(tokenName),
          web3.utils.stringToHex(tokenSymbol),
          web3.utils.stringToHex(organizationName)
        ).encodeABI(),
        "gasLimit": 3000000,
        gasPrice: gasPrice
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
        // transaction["gasLimit"] = gasLimit;
        web3.eth.accounts.signTransaction(transaction, config.testnetFaucetPrivateKey).then(result => {
          web3.eth.sendSignedTransaction(result.rawTransaction).then(receipt => {
            resolve(receipt);
          });
        });
      // });
    });
  },

  mintNewToken: async (privateKey, tokenIdFrom, tokenIdTo, tokenURI, deviceURN, tokenAddress, projectName) => {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    var batch = new web3.BatchRequest();
    const from = parseInt(tokenIdFrom);
    const to = parseInt(tokenIdTo);
    console.log("from", from, "to", to);
    var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
    let nonce = await web3.eth.getTransactionCount(config.testnetFaucetAddress);
    console.log("nonce",nonce);
    for(var i=from; i<=to;i++, nonce++) {

      var transaction = {
        "nonce": nonce,
        "to": tokenAddress,
        "data": tokenContractInstance.methods.mintWithTokenURI(config.testnetFaucetAddress, i, tokenURI, web3.utils.stringToHex(deviceURN)).encodeABI()
      };
      // let gasLimit = await web3.eth.estimateGas(transaction);
      transaction["gasLimit"] = 300000;
      let result = await web3.eth.accounts.signTransaction(transaction, privateKey);
      console.log("Adding", i);
      batch.add(web3.eth.sendSignedTransaction.request(result.rawTransaction, receipt.bind({
        deviceURN: deviceURN,
        tokenId: i,
        projectName: projectName
      })));
    }
    batch.execute();

  },

  checkTotalTokenSupply: (tokenAddress) => {
    return new Promise(function(resolve, reject) {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
      tokenContractInstance.methods.totalSupply().call().then(totalSupply => {
        resolve(totalSupply);
      });
    });
  },

  checkBalance: (address) => {
    return new Promise(function(resolve, reject) {
      balance(address, function(err, result){
        if(err)
          reject(err);
        resolve(result[0].quantity);
      });
    });
  },

  checkTokenBalance: async (address, tokenAddress) => {
    console.log(tokenAddress);
    return new Promise(async function(resolve, reject) {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
      decimals = await tokenContractInstance.methods.decimals().call();
      tokenContractInstance.methods.balanceOf(address).call().then(balance => {
        resolve(balance / 10 ** decimals);
      }).catch(async error => {
        provider = new Web3.providers.WebsocketProvider(ws_provider);
        web3.setProvider(provider);
        reject(error);
      });
    });
  },

   generateEthAddress: async() => {
    return new Promise(async function (resolve, reject) {
      var newEthAddress = new Object();
      var keyStore = generateNewAccount();
      newEthAddress.privateKey = keyStore.privateKey;
      newEthAddress.address = keyStore.address;
      newEthAddress.currencyType = "masterEthereum";
      var createdEthAddress = await Address.create(newEthAddress);
      resolve(createdEthAddress);
    });
  }
}

function receipt(err, receipt) {
  Device.create({
    urn: this.deviceURN,
    tokenId: this.tokenId,
    transactionHash: receipt
  }).then(device => {
    Project.findOne({
      where: {
        name: this.projectName
      }
    }).then(project => {
      project.getOrganization().then(organization => {
        project.addDevice(device);
        organization.addDevice(device);
        console.log("Device created successsfully");
      })
    })
  })
}

function providerHandler(provider, ws_provider, web3) {
  provider.on('connect', () => console.log('ICO Private WS Connected'))
  provider.on('error', e => {
    console.log('WS error occured');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider(ws_provider);
    web3.setProvider(provider);
  });
  provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider(ws_provider);
    web3.setProvider(provider);
  });
}

function generateNewAccount(password) {
  return web3.eth.accounts.create(web3.utils.randomHex(32));
};
