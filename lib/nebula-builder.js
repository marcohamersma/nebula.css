var reduce = require('lodash.reduce');
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

function fakeBaseFile(modules, nebulaConfig) {
  var baseFile = configBuilder(nebulaConfig);

  modules.forEach(function(moduleName) {
    if (moduleName !== 'config') {
      baseFile += importStatement(moduleName);
    }
  });

  return baseFile + '\n';
}

module.exports = (entryFile, options) => new Promise( (resolve, reject) => {
  options = options || {};

  // Ensure we're creating a new array
  const modules = (options.modules || baseConfig.defaultModules).concat([]);
  // If an entry file is provided, we add it to the end of the module list
  // so that the file can profit from all of nebula's mixins + functions;
  if (entryFile) { modules.push(entryFile); }

  // Prepare options for node-sass;
  const outFile = options.outFile;
  const useCleanCSS = !!options.minify;
  const useSourceMap = typeof options.useSourceMap === 'undefined'
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
  const fakeEntryFile = fakeBaseFile(modules, nebulaConfig);

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
