var path = require('path');
var fs = require('fs');

var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

verrors = {};

var dashafy  = function(arg){
   return (key.length === 1 ? '-' : '--') + key;
}

module.exports = function(argv, vdaters, callback){
  for (var key in argv){
    if (!vdaters[key]){
      var badArg = dashafy(key);
      verrors[key] = 'not a valid flag: ' + badArg;;    
    }

    if (vdaters[key] != true){
      ee.emit('validate', key, vdaters[key]);
    }
  }
}

ee.on('validate', function(key, vdater){
}); 

ee.on('verr', function(arg, err){
});


//module.exports = function(argv, callback){
   //// only options 
   //// -a --add -l --list  
   //var allow = { _: true, a: true, add: true, l: true, list: true };
   //var verrors = {};
   //var nverr = 0;
   //for (key in argv){
     //if (allow[key] != true){
         //var addDash = (key.length === 1 ? '-' : '--') + key
         //verrors[addDash] = "not valid argument";
         //nverr++;
     //} else {
       //switch (key){
         //case 'a':
         //case 'add':
           //if (argv[key] == 'true'){
             //verrors[key] = 'argument requires file path';
           //} else {
             //var dashaPaths = argv[key].toString().split(',');
             //if (dashaPaths != 1){
                //for (var p in dashaPaths){
                  //dashaPaths[p] = path.resolve(dashaPaths[p].toString()); 
                   //if (!fs.existsSync(argv[key])){
                     //if (!Array.isArray(verrors[key])) 
                     //verrors[key] = 'path does not exist: ' + argv[key];
                     //nverr++;
                  //} 
                //}
             //} else {
               //console.log('split length', argv[key].toString().split(',')) 
               //console.log('wat');
               //argv[key] = path.resolve(argv[key].toString()); 
               //if (!fs.existsSync(argv[key])){
                 //verrors[key] = 'path does not exist: ' + argv[key];
                 //nverr++;
               //} 
             //}
           //}
           //break;
         //default:

       //}
     //}
   //}
   //if (nverr != 0){
     //callback(verrors);
   //}
//};
