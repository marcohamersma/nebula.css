/* eslint quotes:0 */
var _  = require('underscore'),
    fs = require('fs');

function quote(string) {
  if (shouldQuoteValue(string)) {
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
  key = quote(key);
  return '  ' + pad(key, paddingAmount) + ': ' + quote(value) + "\n";
}

function shouldQuoteValue(value) {
  return !_.isBoolean(value)
          && !_.isNumber(value)
          && value.indexOf('px') < 0
          && value.indexOf('em') < 0
          && value.indexOf('#') < 0;
}

module.exports = function(configuration, fileName, callback) {
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

  fs.writeFile(fileName, output, callback);
};

