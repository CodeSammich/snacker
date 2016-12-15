var express = require('express');
var gradient = require('adaptive-gradient'); // implement later

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Snacker'
  });
});

app.listen(5000);
