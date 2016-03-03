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
var username = casper.cli.options['u'];
var password = casper.cli.options['p'];
if(!username || !password)
    casper.echo('请按照: casperjs v2ex.js --u=yourname --p=yourpassword 格式输入用户名密码！！！').exit();
 
casper.start('https://www.v2ex.com/signin', function() {
    this.echo('进入登录页');
});
 
casper.then(function() {
    this.fill('#Main form', {
        'u':    username,
        'p':    password 
    }, true);
});

casper.then(function() {
    // TODO login success notice
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
