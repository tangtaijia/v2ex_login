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

casper.start('https://www.ele.me/shop/551858', function() {
   console.log('url: ' + this.getCurrentUrl()); 
   this.waitForSelector(".shopmenu-food-name", function() {
       this.scrollToBottom();
       this.capture('eleme.png');
       fs.write('eleme.html', this.getHTML(), 'w'); 
   });
});

casper.run();
