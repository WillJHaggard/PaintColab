"use strict";

var http = require("http");
var fs = require("fs");
var chalk = require("chalk");
var server;

exports.start = function(htmlFileToServe, portNumber) {
    if(!portNumber) throw "port number is required";

    server = http.createServer();
    server.on("request", function(request, response) {
        fs.readFile(htmlFileToServe, function (err, data) {
            if (err) throw err;     //TODO: fix me
            response.end(data);
        });
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    server.close(callback);
};
