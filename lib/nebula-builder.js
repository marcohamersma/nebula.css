var reduce = require('lodash.reduce')
var decamelize = require('decamelize');
var baseConfig = require('./base-config');
var configBuilder = require('./config-builder');
var fs = require('mz/fs');
var path = require('path');
var sass = require('node-sass');

function importStatement(path) {
  return "@import '$1';\n".replace('$1', path);
}

function fakeBaseFile(modules, nebulaConfig) {
  var baseFile = configBuilder(nebulaConfig);

  modules.forEach(function(moduleName) {
    if (moduleName !== 'config') {
      baseFile += importStatement(moduleName);
    }
  });

  return baseFile + "\n";
}

module.exports = (entryFile, options) => new Promise( (resolve, reject) => {
  const modules = baseConfig.defaultModules.concat(entryFile);
  const allowedConfigKeys = Object.keys(baseConfig.variables);

  const outFile = options.outFile;
  const useSourceMap = typeof options.useSourceMap === 'undefined'
                      ? true
                      : options.useSourceMap;

  const nebulaConfig = reduce(options, (result, value, key) => {
    const sassKey = decamelize(key, '-');

    if (allowedConfigKeys.indexOf(sassKey) >= 0) {
      result[sassKey] = value;
    }

    return result;
  }, Object.assign({}, baseConfig.variables));

  const fakeEntryFile = fakeBaseFile(modules, nebulaConfig);

  sass.render({
    includePaths: [path.join(__dirname, '../scss')],
    outputStyle: 'compact',
    data: fakeEntryFile,
    sourceMap: useSourceMap,
    outFile: outFile
  }, function(err, output) {
    if (err) {
      reject(new Error(err));
      return;
    }

    if (outFile) {
      Promise.all([
        fs.writeFile(outFile, output.css, null),
        useSourceMap ? fs.writeFile(outFile + '.map', output.map, null) : null
      ]).catch(reject)
      .then(() => resolve(outFile));
    } else {
      resolve(output.css.toString());
    }
  });
});
