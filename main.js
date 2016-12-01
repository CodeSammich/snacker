const http = require('http');

http.createServer((req, res) => {

    // 1. Tell browser everything is okay
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 2. Send announced text
    res.end('Hello, World!\n');
}).listen(1337);

console.log("Server is running at http://127.0.0.1337");
