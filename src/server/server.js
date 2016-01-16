"use strict";
var chalk = require("chalk");
var http = require("http");
var server;
// console.log(chalk.bgCyan(
//     "This is a server"
// ));

exports.start = function(portNumber, message) {
    if (!portNumber) throw new Error(message);

    server = http.createServer();
    server.on("request", function(request, response) {
        response.end("Hello World");
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    server.close(callback);
};




