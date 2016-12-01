const http = require('http');
const mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:1337/accountsDatabase';

function addUser(userName) {
    /*
      Add a new user to 'usersCollection' collection
     */
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // connected to database
            console.log('Connection established to', url);

            // do something to database
            var userCollection = db.collection('usersCollection');

            // Close connection
            db.close();
        }
    });
}

http.createServer((req, res) => { // arrow function, like lambda expression

    // 1. Tell browser everything is okay
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 2. Send announced text
    res.end('Hello, World!\n');
}).listen(1337);

console.log("Server is running at http://localhost:1337");
