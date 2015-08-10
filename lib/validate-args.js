var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var numkeys = 0;
var numDone = 0;

verrors = {

};

var dashafy  = function(arg){
   return (arg.length === 1 ? '-' : '--') + arg;
}

module.exports = function(argv, vdaters, callback){
  for (var key in argv){
    numkeys++;
    if (!vdaters[key]){
      ee.emit('checkExit'); 
      verrors[key] = 'not a valid flag';
    } else {
      if (vdaters[key] != true){
        vdaters[key](argv[key], function(err){
          if (err) {
            verrors[key] = err;
            console.log('err,', err);
          }
          ee.emit('checkExit');
        });
      }
    }
  }

 ee.on('checkExit', function(){
   numDone++;
   console.log('numkeys', numkeys);
   console.log('numDone', numDone);
 }); 


}

ee.on('validate', function(key, vdater){
  vdater(key, function(err){
    if (err){
      return ee.emit('verr', err);
    }
    
  });
}); 

ee.on('verr', function(err){
  if (err) {
    console.log(err);

  }
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
