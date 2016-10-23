#!/usr/bin/env node
/* eslint no-console:0 */
var program = require('commander');
var camelize = require('camelize');
var nebula = require('./index');
var modules = require('./lib/base-config').defaultModules.filter( m => m !== 'banner');

function list(val) {
  return val.split(',');
}

program
  .usage('<entryFile> [options]')
  .arguments('<entryFile>')
  .option('-o, --output <path>', 'Path to output file, stdout will be used otherwise')
  .option('--noSourceMap', 'Do not generate a sourcemap file alongside the file defined in --output');

// Add an option for all Nebula's default modules
modules.forEach( moduleName => {
  var option = camelize('no-' + moduleName);
  const message = 'Do not include ' + moduleName.replace(/-?classes/, '') + ' classes in the output css';

  program.option('--' + option, message);
});

// Add other options
program
  .option('-m, --modules [modules]', 'comma separated list of nebula modules to use', list)
  .option('--minify', 'Compress CSS output using CleanCSS')
  .option('--noBanner', 'Hide the “Powered by nebula.css…” banner from output css')
  .action(function(entryFile) {
    // Make sure we save the entryFile somewhere if it's passed
    program.entryFile = entryFile;
  })
  .parse(process.argv);

const nebulaConfig = {
  minify: !!program.minify,
  outFile: program.output,
  modules: program.modules
};

modules.forEach( m => {
  // If passed, invert and transform options like noReset to useReset
  const settingForModule = program[camelize('no-' + m)];
  if (settingForModule) {
    nebulaConfig['use-' + m] = !settingForModule;
  }
});

// Go ahead and build
nebula.build(program.entryFile, nebulaConfig)
  .then(output => {
    if (nebulaConfig.outFile) {
      console.log('Written to ' + output);
    } else {
      console.log(output);
    }
  }).catch( err => {
    console.log(err);
    process.exit(1);
  });
