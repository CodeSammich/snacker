const express = require('express');
var app = express();

const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:1337/accountsDatabase';

function addUser(email, passwordHash, rolesArr) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // connected to database
            console.log('Connection established to', url);

            // do something to database
            var userCollection = db.collection('usersCollection');
            var user = {username: email,
                        password: passwordHash,
                        roles: rolesArr};
            userCollection.insert(user, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection.'
                                + 'The documents inserted with "_id" are:',
                                result.length, result);
                }
            });

            // Close connection
            db.close();
        }});
}


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
