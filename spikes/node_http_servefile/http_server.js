
// This spike demonstrates how to server a static file.

// This is a simple spike of Node's HTTP module. The goal was to show
// how to serve a very simple HTML page using Node.
// It's not robust and it reflects a very basic understanding of node; use it
// as a starting point, not a production-quality example.
"use strict";


var http = require("http");
var fs = require("fs");

var server = http.createServer();

server.on("request", (request, response) => {
    console.log("Received request");

    fs.readFile("file.html", (err, data) => {
        if (err) throw err;
        response.end(data);
    });
});

server.listen(8080);

console.log("Server started");
