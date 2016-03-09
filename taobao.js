var fs = require('fs');
var CookieJar = "cookiejar.json";
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36'
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

if(fs.isFile(CookieJar))
    Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
        console.info(JSON.stringify(x, null, 2));
        phantom.addCookie(x);
    });


casper.start('https://taojinbi.taobao.com/index.htm');

casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('a.J_GoTodayBtn').length;
    });
}, function then() {
    this.capture('jinbi.png'); 
    this.captureSelector('button.png', 'a.J_GoTodayBtn');
    this.click('a.J_GoTodayBtn');
});

casper.then(function() {
    this.wait(1000, function() {
        this.capture('success_jinbi.png');
    });
});

casper.run();
