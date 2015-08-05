'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

module.exports = function(filepath, callback){
  var conf = {};
  var absolutePath = path.resolve(filepath);
  fs.exists(absolutePath, function(exists){
    if (!exists) return callback('ERROR: FILE NOT FOUND');
    conf.path = absolutePath;           
    conf.name = path.basename(absolutePath);
    conf.lastUpdate = new Date();
    conf.os = os.platform();
    conf._id = crypto.createHash('md5').update(conf.path + conf.os).digest('hex').substring(0,3);;
    fs.stat(absolutePath, function(err, stat){
      console.log('stat.mode', parseInt(stat.mode.toString(8).toString(8).substring(3,7));
      callback(null, conf);
    });
  });
}
