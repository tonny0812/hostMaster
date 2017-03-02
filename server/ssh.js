var express = require('express');
var nodemiral = require('nodemiral');
var fs = require('fs');
var path = require('path');
var app = express();

var documentRoot = path.join(__dirname, 'pages');

var host = 'www.guodq.cn';
var auth = {username: 'root', password: 'guo258@GH'};
var options = {ssh: {port: 26153}};

var localScriptFile = path.join(__dirname, 'files/test.sh');
var fileName = 'test.txt';
var remoteFileLocation = '/home/file';
var localFile =  path.join(__dirname, 'files/test.txt');

app.get('/', function(req, res, next) {
	var session = nodemiral.session(host, auth, options);
	session.execute('pwd', function(err, code, logs) {
		executeResult = logs.stdout;
		console.log(executeResult);
	});
	fs.exists(localScriptFile, function( exists ){
	   if(exists) {
		   session.executeScript(localScriptFile,function(err, code, logs) {
			   console.log(logs.stdout);
		   });
	   } else {
		   console.log(localScriptFile + ' is not exist!')
	   }
	});
	fs.exists(localFile, function( exists) {
		if(exists) {
			session.execute('mkdir -p ' + remoteFileLocation, function(err, code, logs) {
				session.copy(localFile, remoteFileLocation + '/' + fileName, function(err, code, logs) {
					console.log(code);
					console.log(logs);
				});
			});
	   } else {
		   console.log(localFile + ' is not exist!')
	   }
	});
	res.send('ssh');
});

app.get('/file', function(req, res) {
	 fs.readFile(localFile , function(err,data){
		 if(err){
	        res.writeHeader(404,{
	            'content-type' : 'text/html;charset="utf-8"'
	        });
	        res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
	        res.end();
		 }else{
	        res.download(localFile, fileName);
		 }
	 });
});

app.listen(4001, function() {
	console.log('app is listening at port: 4001');
});