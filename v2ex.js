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
 
casper.start('https://www.v2ex.com/signin', function() {
    fs.write('v2ex_sign.html', this.getHTML(), 'w'); 
});
 
casper.then(function() {
    var username = casper.cli.options['u'];
    var password = casper.cli.options['p'];
    this.fill('#Main form', {
        'u':    username,
        'p':    password 
    }, true);
    this.echo(this.getHTML('#Main form input[type="submit"]', true));
    this.click('#Main form input[type="submit"]');
});

casper.then(function() {
    casper.waitForSelector('#Rightbar > div:nth-child(4) > div > a', function() {
        this.click('#Rightbar > div:nth-child(4) > div > a');
    }, function() {
        this.echo('今天已经领取过登录奖励！！！').exit();
    });
});
casper.then(function() {
    casper.waitForSelector('#Main > div.box > div:nth-child(2) > input', function() {
        this.click('#Main > div.box > div:nth-child(2) > input');
    }, function() {
        this.echo('今天已经领取过登录奖励！！！').exit();
    });
});

casper.then(function() {
    casper.wait(1000,function() {
        this.echo('成功领取登录奖励！！！');
    });
});
casper.run();
