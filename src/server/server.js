"use strict";
var chalk = require("chalk");

console.log(chalk.bgCyan(
    "This is a server"
));

exports.number = function() {
    return 3;
};


