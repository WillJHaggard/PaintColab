/*global desc, task, jake, fail, complete*/
var chalk = require("chalk");

(function() {
"use strict";

desc("Build, Test");
task("default", ["lint"]);




desc("Lint Everything");
task("lint", [], function() {
    var lint = require("./build/lint/lint_runner.js");

    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");
    var options = nodeLintOptions();
    var passed = lint.validateFileList(files.toArray(), options, {});
    if (!passed) fail("Lint Failed");



});

// nodeunit task
desc("Test Everything");
task("test", ["node"], function() {
    var reporter = require("nodeunit").reporters.minimal;
    reporter.run(['src/server/_server_test.js'], null, function(failures) {
        if (failures) fail(chalk.red("Tests Failed :'("));
        complete();
    });
}, { async: true });





// desc("Integrate");
// task("integrate", ["default"], function() {
//     console.log("1. Make sure 'git status' is clean");
//     console.log("2. Build on the integration box");
//     console.log("  a. Walk over to integration box");
//     console.log("  b. 'git pull'");
//     console.log("  c. 'jake'");
//     console.log("3. 'git checkout integration");
//     console.log("4. 'git merge master --no-ff --log");
//     console.log("5. 'git checkout master'");


//     console.log("Integration logic goes here");
// });
// FOR WINDOWS INTEGRATION; NOT WORRIED AS OF RIGHT NOW.

// desc("Ensure correct version of Node is present");
task("node", [], function() {
    var desiredNodeVersion = "v5.0.0\n"; // ISSUE with this..
    // 'node --version'
    var command = "node --version";
    console.log("> " + command);
    var stdout = "";
    var process = jake.createExec(command, { printStdout: true, printStderr: true });
    process.on("stdout", function(chunk) {
        stdout += chunk;
    });
    process.on("cmdEnd", function() {
        if (stdout !== desiredNodeVersion) fail("Incorrect node version. Expected " + desiredNodeVersion);

        console.log("command done");
        complete();
    });
    process.run();

    // jake.exec(command, function() {
    //     complete();
    // }, { printStdout: true, printStderr: true });
}, { async: true });




function nodeLintOptions() {
        return {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: false, // true causes options in validateFileList to not work
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
        };
}
})();
