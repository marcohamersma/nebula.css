/* eslint quotes:0 */
var _     = require('underscore');
var sass  = require('node-sass');
var cssColors  = require('css-color-names');

function quote(string, force) {
  if (shouldQuoteValue(string) || force) {
    return "'" + string + "'";
  }
  return string;
}

function pad(string, amount) {
  var left = Math.max(amount - string.length, 0);
  return string + (Array(left + 1).join(' '));
}

function getMaxLength(array) {
  var max = 0;
  array.forEach(function(item) {
    if (item.length > max) {
      max = item.length;
    }
  });
  return max;
}

function formatMapItem(paddingAmount, value, key) {
  key = quote(key, true);
  return '  ' + pad(key, paddingAmount) + ': ' + quote(value) + ",\n";
}

function isCSSColor(value) {
  return _.keys(cssColors).indexOf(value) >= 0;
}

function shouldQuoteValue(value) {
  return !_.isBoolean(value)
          && !_.isNumber(value)
          && value.indexOf('px') < 0
          && value.indexOf('em') < 0
          && value.indexOf('#') < 0
          && !isCSSColor(value);
}

module.exports = function(configuration) {
  var output = "// Please edit this file :)\n\n";

  _.each(configuration, function(value, key) {
    var itemSass = '$' + key + ': ';

    if (_.isArray(value)) {
      var quotedValues = _.map(value, function(itemValue) {
        return quote(itemValue);
      }).join(', ');
      itemSass += "(" + quotedValues + ");";

    } else if (_.isObject(value)) {
      itemSass = "\n" + itemSass;
      var padAmount = getMaxLength(Object.keys(value)) + 2;
      itemSass += "(\n" + _.map(value, formatMapItem.bind(null, padAmount)).join('') + ');';

    } else {
      itemSass += quote(value) + ';';
    }
    output += itemSass + "\n";
  });

  // Checking if the build is valid SASS
  // TODO: should be async
  try {
    sass.renderSync({data: output});
  } catch(e) {
    console.error("Something went wrong while trying to render the config file", e, output);
    throw e;
  }
  return output;
};

