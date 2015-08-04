'use strict';

var fs = require('fs');

process.env.DOTSYCONF = process.env.DOTSYCONF || __dirname + '/../dotsyconf.json' ;

var ConfCtl = function(){
};

// check if dotsyconf.json exists
// success: -> callback(true)
// failure: => callback(false)
ConfCtl.prototype._existsConf = function(callback){
  fs.exists(process.env.DOTSYCONF, function(exists){
    callback(exists);
  });
};


// create empty json file
// success: -> callback(null, data)
// failure: -> callback(err) 
ConfCtl.prototype._createConf = function(callback){
  var dotsyconfinit = {
    url: null,
    lastupdate: new Date(),
    dotsydir: null
  };
  fs.writeFile(process.env.DOTSYCONF, JSON.stringify(dotsyconfinit), callback);
};

ConfCtl.prototype._loadConf = function(callback){
  fs.readFile(process.env.DOTSYCONF, function(err, data){
    if (err) return callback(err);
    callback(null, JSON.parse(data));
  });
};

module.exports = ConfCtl;

