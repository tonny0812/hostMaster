var sshutil = require('./util');
var path = require('path');

var targetOption = {
    host: "www.guodq.cn",
    auth: {
        username: "root",
        password: "guo258@GH",
        sshport: 26153
    },
    destination: "/home/files"
}

var serverOption = {
    transformFile: path.join(__dirname, 'files/test.txt'),
    startFile: path.join(__dirname, 'files/test.sh')
}

var start = function(targetOption, serverOption, callback) {
    if(typeof targetOption == 'undefined' || typeof serverOption == 'undefined') {
        return console.error("check option info!");
    }
    sshutil.transformFile(targetOption, serverOption, function(type, status) {
        switch(type) {
            case 't' :
                if(status)
                    console.log('transform has done');
                else 
                    console.log('transform failed');
                break;
            case 's' :
                if(status)
                    console.log('script has done');
                else 
                    console.log('script failed');
                break;
        }
       
    });

}

start(targetOption, serverOption);

module.exports = {
    start: start
}