const express = require('express');
var app = express();

var myLogger = function(req, res, next) {
    var d = new Date();
    var dateAndTime = d.getHours() + "h:"
        + d.getMinutes() + "m:"
        + d.getSeconds() + "s";
    console.log("App started at " + dateAndTime);
    next()
};

app.use(myLogger);

app.get('/', function(req, res) {
    res.send('Hello, world!');
});

app.listen(1337);
