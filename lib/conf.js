'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

function removeUserName(absolutePath){
  var split = absolutePath.split('/');
    if (split[2] === process.env.USER){
      split[2] = '$USER';
    }
    return split.join('/');
}

function replaceUserName(absolutePath){
  var split = absolutePath.split('/');
    if (split[2] === '$USER'){
      split[2] = process.env.USER;
    }
    return split.join('/');
}

module.exports = function(filepath, callback){
  var conf = {};
  var absolutePath = path.resolve(filepath);
  fs.exists(absolutePath, function(exists){
    if (!exists) return callback('ERROR: FILE NOT FOUND');
    fs.lstat(absolutePath, function(err, stat){
      if (stat.isSymbolicLink()){
        conf.link = true;
        conf.realPath = removeUserName(fs.realpathSync(absolutePath));
      }
      conf.path = removeUserName(absolutePath);
      conf.name = path.basename(absolutePath);
      conf.lastUpdate = new Date();
      conf.platform = os.platform();
        conf.mode = parseInt(stat.mode.toString(8).toString(8).substring(2,7));
        conf.type = parseInt(stat.mode.toString(8).toString(8).substring(0,3));
        conf._id = crypto.createHash('md5').update(conf.path + conf.os).digest('hex').substring(0,4);;
      callback(null, conf);
    });
  });
}
