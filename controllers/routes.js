var gradient = require('adaptive-gradient'); // implement later
var bcrypt = require('bcrypt');

// bcrypt: password hashing, repo: https://github.com/kelektiv/node.bcrypt.js
const saltRounds = 8; // roughly 40 hashes/sec on 2Ghz core

var userLoggedIn = false;

app.get('/', function(req, res) {
    res.render('home', {
        title: 'Snacker',
        userLoggedIn: userLoggedIn
    });
});

app.post('/register', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.inputEmail;
    var password = req.body.inputPassword;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        addUser(email, hash, firstName, lastName, ['user']);
    });

    // Todo: login user

    res.redirect('/');
});
