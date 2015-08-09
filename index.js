var builder    = require('./lib/nebula-builder'),
    baseConfig = require('./lib/base-config');

module.exports = {
  build: builder,
  defaultModules: baseConfig.defaultModules
};
