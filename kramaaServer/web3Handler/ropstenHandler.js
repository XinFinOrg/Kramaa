var db = require('../database/models/index');
var client = db.client;
var Address = db.userCurrencyAddress;
let Promise = require('bluebird');
const Web3 = require('web3');
var ws_provider = "http://localhost:8545";
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider(ws_provider);
web3.setProvider(provider);
// providerHandler(provider, ws_provider, web3);
var tokenABI = [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"deviceURN","type":"bytes32"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceURN","type":"bytes32"}],"name":"getDeviceInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"_urnMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceURN","type":"bytes32"},{"name":"uri","type":"string"}],"name":"addThing","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"tokenURI","type":"string"},{"name":"deviceURN","type":"bytes32"}],"name":"mintWithTokenURI","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"thingURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[],"name":"MintingFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];
var myContract = new web3.eth.Contract(tokenABI);

const registryABI = require('../contractHandler/Registry/RegistryContractABI');
module.exports = {

  deployContract: (abi, bytecode) => {
    return new Promise(function(resolve, reject) {
      myContract.deploy({
      data: '0x'+ bytecode,
      })
      .send({
        from: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
        gas: 4700000,
        gasPrice: '30000000000'
      }, function(error, transactionHash){
      })
      .on('error', function(error){
        reject(error);
      })
      .on('transactionHash', function(transactionHash){
      })
      .on('receipt', function(receipt){
        console.log(receipt.contractAddress) // contains the new contract address
      })
      .once('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
        resolve({contractAddress: receipt.contractAddress, transactionHash: receipt.transactionHash})
      })
      .then(function(newContractInstance){
        // console.log(newContractInstance.options.address) // instance with the new contract address
      });
    });
  },

  addNewProject: (contractAddress, name, description, tokenName, tokenSymbol, organizationName) => {
    return new Promise((resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab");
      var transaction = {
        "to": "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab",
        "data": registryContractInstance.methods.addNewProject(
          contractAddress,
          web3.utils.stringToHex(name),
          web3.utils.stringToHex(description),
          web3.utils.stringToHex(tokenName),
          web3.utils.stringToHex(tokenSymbol),
          web3.utils.stringToHex(organizationName)
        ).encodeABI()
      };
      // registryContractInstance.methods.addNewProject(
      //   contractAddress,
      //   web3.utils.stringToHex(name),
      //   web3.utils.stringToHex(description),
      //   web3.utils.stringToHex(tokenName),
      //   web3.utils.stringToHex(tokenSymbol),
      //   web3.utils.stringToHex(organizationName)
      // ).send({"from": "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1", "gas": 3000000}).then(res => {
      //   console.log(res);
      // });
      web3.eth.estimateGas(transaction).then(gasLimit => {
        transaction["gasLimit"] = gasLimit;
        web3.eth.accounts.signTransaction(transaction, '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d').then(result => {
          web3.eth.sendSignedTransaction(result.rawTransaction).then(receipt => {
            resolve(receipt);
          });
        });
      });
    });
  },

  mintNewToken: async (privateKey, tokenIdFrom, tokenIdTo, tokenURI, tokenAddress) => {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    var batch = new web3.BatchRequest();
    const from = parseInt(tokenIdFrom);
    const to = parseInt(tokenIdTo);
    console.log("from", from, "to", to);
    var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
    let nonce = await web3.eth.getTransactionCount("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
    console.log("nonce",nonce);
    for(var i=from; i<=to;i++, nonce++) {

      var transaction = {
        "nonce": nonce,
        "to": tokenAddress,
        "data": tokenContractInstance.methods.mintWithTokenURI("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", i, tokenURI).encodeABI()
      };
      let gasLimit = await web3.eth.estimateGas(transaction);
      transaction["gasLimit"] = gasLimit;
      let result = await web3.eth.accounts.signTransaction(transaction, privateKey);
      console.log("Adding", i);
      batch.add(web3.eth.sendSignedTransaction.request(result.rawTransaction, receipt))
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
  console.log(err);
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
