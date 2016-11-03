var fs = require('fs');
var path = require('path');
var configBuilder = require('../lib/config-builder');
var sassVariables = require('../lib/sass-variables');

// This script creates a sass file from the base-config.js file,
// used for developing nebula and making it easy to copy configuration from
// the js-based build tools to the sass based system.
fs.writeFileSync(
  path.join(__dirname, '../scss/_config.scss'),
  configBuilder(sassVariables)
);
