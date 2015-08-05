'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = function(filepath, callback){
  var conf = {
      
      //var path;
      //var lastUpdate;
      //var permisions;
      //var platform;
      //var _id;
  };

  console.log("flupy duppy");
  ////var absolutePath = path.resolve(path);
  console.log('absolutePath', path);
  fs.exists(absolutePath, function(exists){
    if (!exists) return callback('fuck');
    conf.path = absolutePath;           
    //conf.name = path.basename(absolutePath);
    console.log('dat conf', conf);
    callback(null, conf);
  });
}
