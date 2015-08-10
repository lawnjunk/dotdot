'use strict';

var cc = require('./lib/confctl.js');
var Promise = require('promise');
var argv = require('minimist')(process.argv.slice(2)); 
var conf = require('./lib/conf.js');
var validate = require('./lib/validate-args.js');
var fs = require('fs');
var path = require('path');

var addValidate = function(param, callback){
  console.log('hit add validate');
  // get full path
  // check to see if is file
  if (param == true){
    return callback('requires file path');
  }
  
  var absPath = path.resolve(param);
  console.log('absPath', absPath);
  fs.exists(absPath, function(exists){
    console.log('exists', exists);
    if (!exists) return callback('file does not exist');
    callback();
  });
  //if (param != true){
    //callback()
  //} else {
    //callback('fuck');
  //}
};


var validaters = {
  _: true,
  a: addValidate,
  all: addValidate
}

validate(argv, validaters, function(err){
  if(err) return console.log(err);
});



//cc.loadConf(function(err){
  //if (err) return console.error(err);
  //var dotdotConf = cc.dotdot;

  //if (argv.a || argv.add){
    //console.log('add file:', !!argv.a? argv.a : argv.add);
    //var path = argv.a || argv.add;
    //if (path == true) {
      //console.log('USAGE ERROR: <-a path/to/file> <--add path/to/file>');
    //}
    //conf(path, function(err, confFile){
      //if (err) console.log(err);
      //if (!dotdotConf.platforms[confFile.platform]) {
        //dotdotConf.platforms[confFile.platform] = {};
      //}
      //if (!dotdotConf.platforms[confFile.platform][confFile._id]){
        //dotdotConf.platforms[confFile.platform][confFile._id] = confFile;
      //} else {
        //console.error('ERROR: file allready tracked');
      //}
        //cc.writeConf(dotdotConf, function(err){
          //if (err) console.log(err);
        //});
    //});;
  //}

  //if (argv.l || argv.list){
  //}

  //if (argv.r || argv.remove){
  //}

  //if (argv.o || argv.os){
  //}

  //if (argv.g || argv.gather){
  //}

  //if (argv.p || argv.plant){
  //}


  //console.dir( cc.dotdot, {depth: null});


//});
//cc.loadConf().then(function(data){
  //console.log('data', data);
//});

// run action
// save conf
