const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express();

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
    store: new MongoStore({ url: 'mongodb://localhost:27017/sessionDatabase'}),
    resave: true,
    saveUninitialized: true
}));

app.listen(3000);
