var _             = require('underscore'),
    async         = require('async'),
    baseConfig    = require('./base-config'),
    configBuilder = require('./config-builder'),
    fs            = require('fs'),
    path          = require('path'),
    sass          = require('node-sass');

function importStatement(path) {
  return "@import '$1';\n".replace('$1', path);
}

function fakeBaseFile(modules, nebulaConfig) {
  var baseFile = '';
  if (!modules) {
    modules = baseConfig.defaultModules;
  }

  if (nebulaConfig) {
    baseFile += configBuilder(_.extend({}, baseConfig.variables, nebulaConfig));
  } else {
    baseFile += importStatement('config');
  }


  modules.forEach(function(moduleName) {
    if (moduleName !== 'config') {
      baseFile += importStatement(moduleName);
    }
  });

  return baseFile + "\n";
}

module.exports = function(modules, pathName, nebulaConfig, callback) {
  var renderOptions = {
    includePaths: [path.join(__dirname, '../scss/nebula'), path.join(__dirname, 'readme-src')],
    outputStyle:  'compact',
    sourceMap:    true,
    outFile:      pathName
  };

  if (modules || nebulaConfig) {
    renderOptions.data = fakeBaseFile(modules, nebulaConfig);
  } else {
    renderOptions.file = './scss/styles.scss';
  }

  sass.render(renderOptions, function(err, output) {
    if (err) {
      throw err;
    }
    if (pathName) {
      async.parallel([
        fs.writeFile.bind(null, pathName, output.css, null),
        fs.writeFile.bind(null, pathName + '.map', output.map, null)
      ], function(e) {
        if (e) { throw e; }
        callback(pathName);
      });
    } else {
      callback(output.css.toString());
    }
  });
};
