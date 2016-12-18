var express = require('express');
var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.listen(3000);
