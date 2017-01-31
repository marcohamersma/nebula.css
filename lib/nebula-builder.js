'use strict';
var reduce = require('lodash.reduce');
var isNil = require('lodash.isnil');
var decamelize = require('decamelize');
var baseConfig = require('./base-config');
var CleanCSS = require('clean-css');
var configBuilder = require('./config-builder');
var sassVariables = require('./sass-variables');
var fs = require('mz/fs');
var path = require('path');
var sass = require('node-sass');

function importStatement(importPath) {
  return "@import '$1';\n".replace('$1', importPath);
}

function fakeBaseFile(modules, nebulaConfig, append) {
  var baseFile = configBuilder(nebulaConfig);

  modules.forEach(function(moduleName) {
    if (moduleName !== 'config') {
      baseFile += importStatement(moduleName);
    }
  });

  return baseFile + (append ? `\n ${append} \n` : '\n');
}

function getUserOptions(baseOptions) {
  const options = baseOptions || {};
  const configFilePath = path.join(process.cwd(), options.config || '.nebularc');
  let configFile = {};

  try {
    configFile = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
  } catch (e) {
    // If we're tried loading the default .nebularc, but it wasn't there.
    // Don't show any errors
    if (e.code !== 'ENOENT' || options.config) {
      throw (e);
    }
  }

  return Object.assign({}, configFile, baseOptions);
}

module.exports = (entryFile, userOptions) => new Promise( (resolve, reject) => {
  const options = getUserOptions(userOptions);

  // Ensure we're creating a new array
  const modules = (options.modules || baseConfig.defaultModules).concat([]);
  // If an entry file is provided, we add it to the end of the module list
  // so that the file can profit from all of nebula's mixins + functions;
  if (entryFile) { modules.push(entryFile); }

  // Prepare options for node-sass;
  const outFile = options.outFile;
  const useCleanCSS = !!options.minify;
  const useSourceMap = isNil(options.useSourceMap)
                      ? true
                      : options.useSourceMap;

  // Find out what configuration variables we should pass along to the SASS file
  const allowedConfigKeys = Object.keys(sassVariables);

  const nebulaConfig = reduce(options, (result, value, key) => {
    // convert js-style camelCase variable to dash-case
    const sassKey = decamelize(key, '-');

    // TODO: this is a bit smelly, is there a better way to do this?
    // Is this really necessary?
    if (
      allowedConfigKeys.indexOf(sassKey) >= 0
      || sassKey.indexOf('breakpoint') === 0
    ) {
      result[sassKey] = value;
    }

    return result;
  }, Object.assign({}, sassVariables)); // Start with default variables

  // With the list of modules and configuration, we create a fake base file
  // that adds all configuration variables, and imports all
  // selected modules and the entry file.
  const fakeEntryFile = fakeBaseFile(modules, nebulaConfig, options.append);

  // then we tell SASS to start rendering this file
  sass.render({
    includePaths: [path.join(__dirname, '../scss')],
    outputStyle: 'compact',
    data: fakeEntryFile,
    sourceMap: useSourceMap,
    outFile: outFile
  }, function(err, output) {
    if (err) return reject(err);
    if (useCleanCSS) {
      var cleanOutput = new CleanCSS({
        sourceMap: output.map ? output.map.toString() : null,
      }).minify(output.css.toString());
    }

    var css = cleanOutput ? cleanOutput.styles : output.css.toString();
    var map = cleanOutput ? cleanOutput.sourceMap : output.map;

    if (outFile) {
      Promise.all([
        fs.writeFile(outFile, css, null),
        useSourceMap ? fs.writeFile(outFile + '.map', map, null) : null
      ]).catch(reject)
      .then(() => resolve(outFile));
    } else {
      resolve(css.toString());
    }
  });
});
