'use strict';

var http = require('http');
var koa = require('koa');
var app = koa();
var router = require('koa-router');

app.use(router(app));

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

// routes: response
app.get('/', function *() {
    this.body = 'GET index';
});

app.post('/', function *() {
    this.body = 'POST index';
});

// run
// app.listen(3001);

http.createServer(app.callback()).listen(3001);
http.createServer(app.callback()).listen(3002);