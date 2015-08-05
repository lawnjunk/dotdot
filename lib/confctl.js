'use strict';

var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

process.env.DOTDOTCONF = process.env.DOTDOTCONF || process.env.HOME + '/.dotdot.json' ;

var ConfCtl = {
  dotdot: null,

};

// check if dotdotconf.json exists
// success: -> callback(true)
// failure: => callback(false)
var _existsConf = function(callback){
  fs.exists(process.env.DOTDOTCONF, callback);
};

// create empty json file
// success: -> callback()
// failure: -> callback(err)
var _createConf = function(callback){
  var dotdotconfinit = {
    url: null,
    lastupdate: new Date(),
    dotdotdir: null,
    platforms: {}
  };

  fs.writeFile(process.env.DOTDOTCONF, JSON.stringify(dotdotconfinit), function(err){
    if (err) return callback(err);
    callback();
  });
};

// read the JSON conffile from disk convert to object
// success: -> Promise.resolve(confObject)
// failure: -> Promise.reject(err)
var _readConf = function(callback){
  fs.readFile(process.env.DOTDOTCONF, function(err, data){
    if (err) return callback(err);
    callback(null, JSON.parse(data.toString()));
  });
};

ConfCtl._existsConf = _existsConf;
ConfCtl._writeConf = _writeConf;
ConfCtl._createConf = _createConf;
ConfCtl._readConf = _readConf;

// write this.confData to disk
// success: -> callback()
// faulure: -> callback(err)
var _writeConf = function(dotdotConf,callback){
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
var loadConf = function(callback){
  ConfCtl._existsConf(function(exists){
    if (!exists) {
      return ee.emit('confNOExists');
    }
    ee.emit('confExists');
    console.log('emit that it does exist');
  });
  
  ee.on('confNOExists', function(){
    ConfCtl._createConf(function(err){
      if (err){      
        console.log('error thrown in _existsConf');
        return console.error(err);
      }

      ee.emit('confExists');
    });
  });

  ee.on('confExists', function(){
    ConfCtl._readConf(function(err, data){
      if (err) return console.error(err);
      ConfCtl.dotdot = data;
      callback();
    });
  });
      //ConfCtl._createconf(function(err){
        //if (err) return console.error(err);
        //ConfCtl._readConf(function(err, data){
          //if (err) return console.error(err);
          //this.dotdot = data;
          //callback();
        //});
    //this._readConf(function(err, data){
      //if (err) return console.error(err);
      //this.dotdot = data;
      //callback();
    //});
}

ConfCtl.loadConf = loadConf;
ConfCtl._writeConf = _writeConf;
  //this._existsConf().catch(this._createConf).then(this._readConf)
    //.then(function(data){
      //callback(null, data);
    //})
    //.catch(function(err){
      //callback(err);
    //});

module.exports = ConfCtl;
