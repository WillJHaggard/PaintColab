

/**
This is a simple spike of Node's HTTP module (2012). The goal
was to show how to serve a ver simple HTML page using node.
It's not robust and it reflects a very basic understanding of node;
use it as a starting point, not a production-quality example.
*/

var http = require('http');

var server = http.createServer();

server.on("request", function(request, response) {
    console.log("Received Request");

    var body = "<html><head><title>Node HTTP Spike</title></head>" +
                "<body><h1>This is a spike of Node's HTTP server.</h1></body></html>";

    response.end(body);
});

server.listen(1234);

console.log("Server started");


