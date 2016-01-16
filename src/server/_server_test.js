"use strict";

var server = require("./server.js");
var http = require("http");
var fs = require("fs");
var assert = require("assert");

var TEST_FILE = "generated/test/test.html";

exports.tearDown = (done) => {
    if (fs.existsSync(TEST_FILE)) {
        fs.unlinkSync(TEST_FILE);
        assert.ok(!fs.existsSync(TEST_FILE), "could not deleted test file: [" + TEST_FILE + "]");
    }
    done();
};

exports.test_serverServesAFile = (test) => {
    var testDir = "generated/test";
    var testData = "This is served from a file";

    fs.writeFileSync(TEST_FILE, testData);
    server.start(TEST_FILE, 8080);
    var request = http.get("http://localhost:8080");
    request.on("response", (response) => {
        var receivedData = false;
        response.setEncoding("utf8");

        test.equals(200, response.statusCode, "status code");
        response.on("data", (chunk) => {
            receivedData = true;
            test.equals(testData, chunk, "rsponse text");
        });
        response.on("end", () => {
            test.ok(receivedData, "should have received response data");
            server.stop(() => {
                test.done();
            });
        });
    });
};

exports.test_serverRequiresFileToServe = (test) => {
    test.throws(() => {
        server.start();
    });
    test.done();
};

exports.test_serverRequiresPortNumber = (test) => {
    test.throws(() => {
        server.start(TEST_FILE);
    });
    test.done();
};

exports.test_serverRunsCallbackWhenStopCompletes = (test) => {
    server.start(TEST_FILE, 8080);
    server.stop(() => {
        test.done();
    });
};

// exports.test_stopCalledWhenServerIsntRunningThrowsException = (test) => {
//     test.throws(() => {
//         server.stop();
//     });
//     test.done();
// };
