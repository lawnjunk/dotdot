'use strict';

var ConfCtl = require('./lib/confctl.js');
var cc = new ConfCtl();
var Promise = require('promise');


var exists = function(){
  return new Promise(function(resolve, reject){
    cc._existsConf(function(exists){
      console.log('the file does ' + ( exists ? 'exist': 'not exist'));
      if (exists) return resolve();
      reject();
    });
  });
}

var createConf = function(){
  return new Promise(function(resolve, reject){
    cc._createConf(function(err,data){
      if (err) return reject(err);
      resolve();
    });
  });
};

// load conf
var loadConf = function(){
  return new Promise(function(resolve, reject){
    cc._loadConf(function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

exists().then(loadConf).catch(createConf).then(loadConf).then(function(data){
  console.log(data);
}).catch(function(err){
  console.error('ERROR loading dotsyconf:\n', err);;
});


// run action
// save conf
