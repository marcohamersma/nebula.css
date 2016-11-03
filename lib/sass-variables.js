var baseConfig = require('../lib/base-config');
var reduce = require('lodash.reduce');
var decamelize = require('decamelize');

module.exports = reduce(baseConfig.variables, (result, value, key) => {
  result[decamelize(key, '-')] = value;
  return result;
}, {});
