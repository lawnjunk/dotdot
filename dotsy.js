'use strict';

var ConfCtl = require('./lib/confctl.js');
var cc = new ConfCtl();
var Promise = require('promise');
var argv = require('minimist')(process.argv.slice(2)); 
var conf = require('./lib/conf.js');

cc.loadConf(function(err, data){
  if (err) return console.error(err);
  var dotsyConf = data;

  if (argv.a || argv.add){
    console.log('add file:', !!argv.a? argv.a : argv.add);
    var path = argv.a || argv.add;
    if (path == true) {
      console.log('USAGE ERROR: <-a path/to/file> <--add path/to/file>');
    }
    conf(path, function(err, confFile){
      if (err) console.log(err);
      if (!dotsyConf.platforms[confFile.platform]) {
        dotsyConf.platforms[confFile.platform] = {};
      }
      if (!dotsyConf.platforms[confFile.platform][confFile._id]){
        dotsyConf.platforms[confFile.platform][confFile._id] = confFile;
      } else {
        console.error('ERROR: file allready tracked');
      }
        cc.writeConf(dotsyConf, function(err){
          if (err) console.log(err);
        });
    });;
  }

  if (argv.l || argv.list){
  }

  if (argv.r || argv.remove){
  }

  if (argv.o || argv.os){
  }

  if (argv.g || argv.gather){
  }

  if (argv.p || argv.plant){
  }


  console.dir( data, {depth: null});


});
//cc.loadConf().then(function(data){
  //console.log('data', data);
//});

// run action
// save conf
