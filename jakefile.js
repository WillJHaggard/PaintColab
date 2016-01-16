/*global desc, task, jake, fail, complete*/
(function() {
"use strict";

desc("Build and Test");
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


desc("Test everything");
task("test", [], function() {
    var reporter = require("nodeunit").reporters.minimal;
    reporter.run(['src/server/_server_test.js']);
});





desc("Integrate");
task("Integrate", ["default"], function() {
    console.log("1. Make sure 'git status' is clean");
    console.log("2. Build on the integration box");
    console.log("  a. Walk over to integration box");
    console.log("  b. 'git pull'");
    console.log("  c. 'jake'");
    console.log("3. 'git checkout integration");
    console.log("4. 'git merge master ==no-ff --log");
    console.log("5. 'git checkout master'");


    console.log("Integration logic goes here");
});

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
