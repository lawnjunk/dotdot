'use strict';

var fs = require('fs');
var Promise = require('promise');

process.env.DOTDOTCONF = process.env.DOTDOTCONF || process.env.HOME + '/.dotdotconf.json' ;

var ConfCtl = function(){
};

// check if dotdotconf.json exists
// success: -> Promise.resolve()
// failure: => Promise.reject()
ConfCtl.prototype._existsConf = function(){
  return new Promise(function(resolve, reject){
    fs.exists(process.env.DOTDOTCONF, function(exists){
      if (exists) return resolve();
      reject();
    });
  });
};

// create empty json file
// success: -> Promise.resolve() 
// failure: -> Promise.reject(err) 
ConfCtl.prototype._createConf = function(){
  return new Promise(function(resolve, reject){
    var dotdotconfinit = {
      url: null,
      lastupdate: new Date(),
      dotdotdir: null,
      platforms: {}
    };

    fs.writeFile(process.env.DOTDOTCONF, JSON.stringify(dotdotconfinit), function(err){
      if (err) return reject(err);
      resolve(); 
    });
  });
};

// read the JSON conffile from disk convert to object
// success: -> Promise.resolve(confObject)
// failure: -> Promise.reject(err)
ConfCtl.prototype._readConf = function(){
  return new Promise(function(resolve, reject){
    fs.readFile(process.env.DOTDOTCONF, function(err, data){
      if (err) return reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
};

// write this.confData to disk
// success: -> callback()
// faulure: -> callback(err)
ConfCtl.prototype.writeConf = function(dotdotConf,callback){
  console.log('slup writeConf');
    fs.writeFile(process.env.DOTDOTCONF, JSON.stringify(dotdotConf), function(err){
      if (err) return callback(err);
      callback();
    });
};

// check if conf exsit
// if not create it
// once sure it exist load it
// success: -> callback(null, confObject)
// failure: -> callback(err)
ConfCtl.prototype.loadConf = function(callback){
  this._existsConf().catch(this._createConf).then(this._readConf)
    .then(function(data){
      callback(null, data);
    })
    .catch(function(err){
      callback(err);
    });
}

module.exports = ConfCtl;
