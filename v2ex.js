var colorizer = require('colorizer').create('Colorizer');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    loadImages: true,
    loadPlugins: true,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
  },
  viewportSize: {
    width: 1366,
    height: 768
  }
});
 
var headers = {
  method: 'get',
  headers: {
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
    ':host': 'www.v2ex.com',
    ':method': 'GET',
    ':path': '/signin',
    ':scheme': 'https',
    ':version': 'HTTP/1.1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, sdch',
    'referer': 'https://www.v2ex.com/signin',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
  }
};
 
var url = "https://www.v2ex.com/signin";
 
var echoCurrentPage = function() {
  this.echo(colorizer.colorize("[Current Page]", "INFO") + this.getTitle() + " : " + this.getCurrentUrl());  
};
 
casper.on('resource.requested', function(request) {
  this.echo(colorizer.colorize("SENDING REQUEST #" + request.id + " TO " + request.url, "PARAMETER"));
});
 
casper.start();
 
casper.open(url, headers).then(function(response) {
  echoCurrentPage.call(this);
  this.debugHTML();
});
 
casper.thenOpen(url).then(function(response) {
  echoCurrentPage.call(this);
  this.debugHTML();
});
 
casper.run();
