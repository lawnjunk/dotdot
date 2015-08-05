'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

function removeUserName(absolutePath){
  var split = absolutePath.split('/');
    if (split[2] === process.env.USER){
      split[2] = '$USER' 
    }
    return split.join('/');
}

module.exports = function(filepath, callback){
  var conf = {};
  var absolutePath = path.resolve(filepath);
  fs.exists(absolutePath, function(exists){
    if (!exists) return callback('ERROR: FILE NOT FOUND');
    conf.path = removeUserName(absolutePath);
    conf.name = path.basename(absolutePath);
    conf.lastUpdate = new Date();
    conf.platform = os.platform();
    fs.stat(absolutePath, function(err, stat){
      conf.mode = parseInt(stat.mode.toString(8).toString(8).substring(3,7));
      conf._id = crypto.createHash('md5').update(conf.path + conf.os).digest('hex').substring(0,4);;
      callback(null, conf);
    });
  });
}
