var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
phantom.addCookie({
    "domain": "waimai.meituan.com",
    "expirationDate": 1456845515.116531,
    "hostOnly": true,
    "httpOnly": false,
    "name": "REMOVE_ACT_ALERT",
    "path": "/",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "1",
    "id": 14
});


casper.start('http://waimai.meituan.com/home/wtsmytnkn2vx', function() {
   console.log('url: ' + this.getCurrentUrl()); 
   this.wait(1000, function() {
       this.scrollToBottom();
       this.capture('index.png');
       this.debugHTML();
       fs.write('index.html', this.getHTML(), 'w'); 
   });
});

casper.run();
