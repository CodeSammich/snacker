var express = require('express');
var app = express();
var env = (function() { // local env for session secret key
    var Habitat = require("habitat");
    Habitat.load();
    return new Habitat();
}())

app.set('views', 'views');
app.set('view engine', 'jade');

// To pass POST data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.cookieParser());
app.use(express.session({secret: env.get('SESSION_SECRET')});

app.listen(3000);
