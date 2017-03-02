var nodemiral = require('nodemiral');

//var host = "45.78.38.137";
var host = 'www.guodq.cn';
var auth = {username: 'root', password: 'guo258@GH'};
var options = {ssh: {port: 26153}};
var session = nodemiral.session(host, auth, options);

session.execute('uname -a', function(err, code, logs) {
  console.log(logs.stdout);
});