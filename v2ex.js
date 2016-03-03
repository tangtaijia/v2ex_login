var colorizer = require('colorizer').create('Colorizer');
var fs = require('fs');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
  },
  viewportSize: {
    width: 1366,
    height: 768
  }
});
 
var url = "https://www.v2ex.com/signin";
 
var echoCurrentPage = function() {
  this.echo(colorizer.colorize("[Current Page]", "INFO") + this.getTitle() + " : " + this.getCurrentUrl());  
};
 
casper.start();
 
casper.open(url).then(function(response) {
  echoCurrentPage.call(this);
  fs.write('v2ex_sign.html', this.getHTML(), 'w'); 
});
 
casper.run();
