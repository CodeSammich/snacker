const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:1337/accountsDatabase';

function addUser(email, passwordHash, rolesArr) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // connected to database
            console.log('Connection established to', mongoUrl);

            // do something to database
            var userCollection = db.collection('usersCollection');
            var user = {username: email,
                        password: passwordHash,
                        roles: rolesArr};

            if (userCollection.find({username: email}) !== null) {
                // if account with same email exists
                db.close();
                return;
            }

            userCollection.insertOne(user, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    let message = 'Inserted %d documents into "usersCollection"'
                    + 'The documents inserted with "_id" are:';
                    console.log(message, result.length, result);
                }
            });

            // Close connection
            db.close();
        }});
}
