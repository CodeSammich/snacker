var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

dotenv.config(); // to get env secret key

// To pass POST data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.listen(3000);
