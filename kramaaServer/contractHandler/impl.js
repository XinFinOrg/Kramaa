var fileReader = require('../fileReader/impl');
let Promise = require('bluebird');
let ejs = require('ejs');
const solc = require('solc');
module.exports = {
  createERC721Contract: async (tokenName, tokenSymbol) => {
    return new Promise( async (resolve, reject) => {
      var SafeMath = await fileReader.readEjsFile(__dirname + '/ERC721contracts/SafeMath.sol');
      var Roles = await fileReader.readEjsFile(__dirname + '/ERC721contracts/Roles.sol');
      var ERC721Holder = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Holder.sol');
      var Address = await fileReader.readEjsFile(__dirname + '/ERC721contracts/Address.sol');
      var ERC165 = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC165.sol');
      var ERC721Mintable = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Mintable.sol');
      var ERC721Enumerable = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Enumerable.sol');
      var ERC721Metadata = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Metadata.sol');
      // var isPausable = (req.body.isPausable == "on") ? true : false;
      // var isBurnable = (req.body.isBurnable == "on") ? true : false;
      // var isOwnable = (req.body.isOwnable == "on") ? true : false;
      var isPausable = true;
      var isBurnable = true;
      var isOwnable = true;
      var ERC721Burnable, ERC721Pausable, Ownable, inherits = "";

      if (isBurnable) {
        ERC721Burnable = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Burnable.sol');
        inherits += ", ERC721Burnable";
      }

      if (isPausable) {
        ERC721Pausable = await fileReader.readEjsFile(__dirname + '/ERC721contracts/ERC721Pausable.sol');
        inherits += ", ERC721Pausable";
      }
      if (isOwnable) {
        Ownable = await fileReader.readEjsFile(__dirname + '/ERC721contracts/Ownable.sol');
        inherits += ", Ownable";
      }
      ejs.renderFile(__dirname + '/ERC721contracts/Coin.sol', {
        'SafeMath': SafeMath,
        'Roles': Roles,
        'ERC721Holder': ERC721Holder,
        'Address': Address,
        'ERC165': ERC165,
        'ERC721Enumerable': ERC721Enumerable,
        'ERC721Metadata': ERC721Metadata,
        'ERC721Burnable': ERC721Burnable,
        'ERC721Mintable': ERC721Mintable,
        'ERC721Pausable': ERC721Pausable,
        'Ownable': Ownable,
        'tokenName': tokenName,
        'tokenSymbol': tokenSymbol,
        'inherits': inherits
      }, async (err, data) => {
        if(err)
          reject(err);
        resolve(data);
      });
    });
  },

  compileContract: (contractCode) => {
    return new Promise(async (resolve, reject) => {
      byteCode = await solc.compile(contractCode, 1).contracts[':Coin'];
      resolve({byteCode: byteCode.bytecode, abi: byteCode.interface});
    })
  }
}
