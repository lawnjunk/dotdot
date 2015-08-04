'use strict';

var ConfCtl = require('./lib/confctl.js');
var cc = new ConfCtl();
var Promise = require('promise');

cc.loadConf()
  .then(function(data){
    console.log('success loading conf');
    console.log(data);
  })
  .catch(function(err){
    console.error(err);
  });


// run action
// save conf
