var gradient = require('adaptive-gradient'); // implement later
var bcrypt = require('bcrypt');

// bcrypt: password hashing, repo: https://github.com/kelektiv/node.bcrypt.js
const saltRounds = 8; // roughly 40 hashes/sec on 2Ghz core

app.get('/', function(req, res) {
    req.session.lastPage = '/';

    // initial values (quiet unnecessary registration alerts)
    if (req.session.regTried == undefined) {
        // if user hadn't tried to register, remove potential for alert box
        req.session.passTooShort = false;
        req.session.passGoodChars = true;
        req.session.userAlreadyExists = false;
        req.session.passwordsMatch = true;
        req.session.successfullyRegistered = false;
        req.session.userAlreadyExists = false;
    }
    if (req.session.userLoggedIn == undefined) {
        req.session.userLoggedIn = false;
    }

    res.render('home', {
        title: 'Snacker',
        userLoggedIn: req.session.userLoggedIn,
        passTooShort: req.session.passTooShort,
        passGoodChars: req.session.passGoodChars,
        userAlreadyExists: req.session.userAlreadyExists,
        passwordsMatch: req.session.passwordsMatch,
        successfullyRegistered: req.session.successfullyRegistered
    });

    req.session.regTried = undefined; // reset alert condition
});

app.post('/register', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.inputEmail;
    var password = req.body.inputPassword;
    var confirmPassword = req.body.confirmPassword;

    const validPassChars = '1234567890abcdefghijklmnopqrstuvwxyz';

    // if passwords match
    req.session.passwordsMatch = (password == confirmPassword);

    // check if password is long enough and doesn't contain weird chars
    if (!password.length >= 7) {
        req.session.passTooShort = true;
    }
    for (var i = 0; i < password.length; i++) {
        // if password chars aren't valid (a-z, 0-9)
        if (!validPassChars.includes( password.charAt(i).toLowerCase() )) {
            req.session.passGoodChars = false;
        }
    }
    // If it passes the password conditions
    if (!req.session.passTooShort
        &&
        req.session.passGoodChars
        &&
        req.session.passwordsMatch)
    {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            addUser(email, hash, firstName, lastName, ['user'],
                    function(uniqueUser) {
                        console.log("Unique User: " + uniqueUser);
                        if (uniqueUser) {
                            req.session.userLoggedIn = true;
                            req.session.successfullyRegistered = true;
                            req.session.userAlreadyExists = false;
                        } else {
                            // user already exists
                            req.session.userAlreadyExists = true;
                            req.session.userLoggedIn = false;
                        }
                    })});
    } else { // registration not properly done
        req.session.lastPage = '/';
        console.log('account not registered successfully. alert shown');
    }

    if (!req.session.lastPage) { // lastPage doesn't exist
        req.session.lastPage = '/';
    }

    console.log('/register redirected to ' + req.session.lastPage);
    req.session.regTried = true; // tried to register
    res.redirect(req.session.lastPage);
});
