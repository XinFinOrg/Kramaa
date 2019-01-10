var fs = require('fs');
var ejs = require("ejs");
let Promise = require('bluebird');

module.exports = {

  readEjsFile: (path) => {
    return new Promise(function(resolve, reject) {
      ejs.renderFile(path, {}, (err, data) => {
        if(err)
          reject(err);
        resolve(data);
      });
    });
  }

}
