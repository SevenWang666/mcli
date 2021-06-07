#!/usr/bin/env node
"use strict";
var actions = require('../lib/index');
var commander = require('commander');
commander
    .command("build")
    .option("-a, --all", "build All")
    .option("-m,--mode [mode]", "which mode to build")
    .action(function (options) {
    actions.buildModules(options.mode);
});
commander
    .command("publish")
    .option("-m,--mode [mode]", "which mode to publish")
    .option("-a, --all", "build All")
    .action(function (options) {
    actions.publishModules(options.mode);
});
commander
    .command("build:publish")
    .option("-m,--mode [mode]", "which mode to build and publish")
    .option("-a, --all", "build All")
    .action(function (options) {
    actions.buildAndPublish(options.mode);
});
commander.parse(process.argv);
