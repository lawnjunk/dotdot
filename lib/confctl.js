'use strict';

var fs = require('fs');
var Promise = require('promise');

process.env.DOTSYCONF = process.env.DOTSYCONF || __dirname + '/../dotsyconf.json' ;

var ConfCtl = function(){
};

// check if dotsyconf.json exists
// success: -> (true)
// failure: => (false)
ConfCtl.prototype._existsConf = function(){
  return new Promise(function(resolve, reject){
    fs.exists(process.env.DOTSYCONF, function(exists){
      if (exists) return resolve();
      reject();
    });
  });
};

// create empty json file
// success: -> (null, data)
// failure: -> (err) 
ConfCtl.prototype._createConf = function(){
  return new Promise(function(resolve, reject){
    var dotsyconfinit = {
      url: null,
      lastupdate: new Date(),
      dotsydir: null
    };

    fs.writeFile(process.env.DOTSYCONF, JSON.stringify(dotsyconfinit), function(err, data){
      if (err) return reject(err);
      resolve(data); 
};

ConfCtl.prototype._loadConf = function(){
  return new Promise(function(resolve, reject){
    fs.readFile(process.env.DOTSYCONF, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
};

// check if conf exsit
// if not create it
// once sure it exist load it
// success: -> return dotsyconfObject and set this.dotsyconf to dotseyconfObject
// failure: -> log err and return null
ConfCtl.prototype.loadConf = function(callback){
  return new Promise(function(resolve, reject){
    this._existsConf().catch(this._createConf).then(this._loadConf)
      .then(function(data){
        resolve(data);
      })
      .catch(function(err){
        reject(err);
      });
  });
};

module.exports = ConfCtl;


