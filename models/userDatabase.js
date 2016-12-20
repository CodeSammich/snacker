const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var accountsUrl = 'mongodb://localhost:27017/accountsDatabase';

function addUser(email, passwordHash, firstName, lastName, rolesArr, callback) {
    MongoClient.connect(accountsUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // connected to database
            console.log('Connection established to', accountsUrl);

            // do something to database
            var userCollection = db.collection('usersCollection');
            var user = {username: email,
                        password: passwordHash,
                        firstName: firstName,
                        lastName: lastName,
                        roles: rolesArr};

            var uniqueUser = true;
            if (userCollection.find({username: email}) !== null) {
                // if account with same email exists
                console.log("duplicate document found in accountsDatabase");
                db.close();
                uniqueUser = false;
            } else {
                userCollection.insertOne(user, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        let message = 'Inserted %d documents into "usersCollection"'
                            + 'The documents inserted with "_id" are:';
                        console.log(message, result.length, result);
                    }
                });
            }

            // Close connection
            db.close();

            callback(uniqueUser);
        }});
}

function getUser(email) {
    // returns a user (used for login)
    // use session specific info for afterward

    MongoClient.connect(accountsUrl, function(err, db) {
        if (err) {
            console.log("Unable to connect to the mongoDB server. Error:", err);
        } else {
            console.log("Connection established to", accountsUrl);

            var userCollection = db.collection('usersCollection');
            var user = userCollection.find({username: email});
            return user;
        }
    })
}
