#!/usr/bin/env node
var program = require('commander');
var camelize = require('camelize');
var nebula = require('./index');
var modules = require('./lib/base-config').defaultModules.filter( m => m !== 'banner');

program.arguments('<entryFile>')
  .usage('<entryFile> [options]')
  .option('-o, --output <path>', 'Path to output file, stdout will be used otherwise')
  .option('--noSourceMap', 'Do not generate a sourcemap file alongside the file defined in --output');

modules.forEach( moduleName => {
  var option = camelize('no-' + moduleName);
  const message = 'Do not include ' + moduleName.replace(/-?classes/, '') + ' classes in the output css';

  program.option('--' + option, message);
});

function list(val) {
  return val.split(',');
}

program
  .option('-m, --modules [modules]', 'comma separated list of nebula modules to use', list)
  .option('--noBanner', 'Hide the “Powered by nebula.css…” banner from output css')
  .action(function(entryFile) {
    const nebulaConfig = {
      outFile: program.output,
      modules: program.modules
    };

    modules.forEach( m => {
      const settingForModule = program[camelize('no-' + m)];
      if (settingForModule) {
        nebulaConfig['use-' + m] = !settingForModule;
      }
    });

    nebula.build(entryFile, nebulaConfig)
      .then(output => {
        if (nebulaConfig.outFile) {
          console.log('Written to ' + output);
        } else {
          process.stdout.write(output);
        }
      }).catch( err => {
        console.error(err);
        process.exit(1);
      });
  })
  .parse(process.argv);
