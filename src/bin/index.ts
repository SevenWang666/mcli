#!/usr/bin/env node
const actions = require('../lib/index')
const commander = require('commander')

commander
  .command("build")
  .option("-a, --all", "build All")
  .option("-m,--mode [mode]", "which mode to build")
  .action(function (options:any) {
    actions.buildModules(options.mode);
  });
commander
  .command("publish")
  .option("-m,--mode [mode]", "which mode to publish")
  .option("-a, --all", "build All")
  .action(function (options:any) {
    actions.publishModules(options.mode);
  });
commander
  .command("build:publish")
  .option("-m,--mode [mode]", "which mode to build and publish")
  .option("-a, --all", "build All")
  .action(function (options:any) {
    actions.buildAndPublish(options.mode);
  });

commander.parse(process.argv);
