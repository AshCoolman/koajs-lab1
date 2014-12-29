'use strict';

var koa = require("koa");
var app = koa();

// middleware: output
app.use( function *(next) {
    this.body = "Hello nurse!";
})

// run
app.listen(3001);