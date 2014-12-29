'use strict';

var http = require('http');
var koa = require('koa');
var app = koa();

// mw: x response time
app.use(function *(next) {
    var t0 = new Date();
    yield next;

    var t1 = new Date();
    this.set('x-response-time', (t1 - t0)+'ms');
});

// mw: logger
app.use(function *(next) {
    var t0 = new Date();
    yield next;

    var t1 = new Date();
    console.log('%s %s (%sms)', this.method, this.url, t1-t0);
});

// mw: response
app.use(function *() {
    this.body = 'Hello nurse!';
});

// run
// app.listen(3001);

http.createServer(app.callback()).listen(3001);
http.createServer(app.callback()).listen(3002);