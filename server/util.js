var nodemiral = require('nodemiral');
var fs = require('fs');
var path = require('path');

var transformFile = function(targetOption, serverOption, callback) {
  var tfile = serverOption.transformFile;
  var startfile = serverOption.startFile;
  var host = targetOption.host;
  var auth = {
    username: targetOption.auth.username, 
    password: targetOption.auth.password
  };
  var options = {
      ssh: {
        port: targetOption.auth.sshport
      }
  };
  var session = nodemiral.session(host, auth, options);
  fs.exists(tfile, function( exists) {
		if(exists) {
			session.execute('mkdir -p ' + targetOption.destination, function(err, code, logs) {
        if(err) return console.error(err);
				session.copy(tfile, targetOption.destination + "/" + "1.txt", function(err, code, logs) {
          var status = true;
          if(err) status = false;
          callback('t', status);
          excuteStart(session, startfile, callback);
				});
			});
	   } else {
       return console.error(tfile + ' is not exist!')
	   }
	});
}

function excuteStart(session, scriptFile, callback) {
  if(typeof session == 'undefined') return console.error('session is null');
  fs.exists(scriptFile, function( exists ){
	   if(exists) {
		   session.executeScript(scriptFile, function(err, code, logs) {
          var status = true;
          if(err) status = false;
          callback('s', status);
		   });
	   } else {
		   console.error(scriptFile + ' is not exist!')
	   }
	});
}

module.exports = {
  transformFile: transformFile
}