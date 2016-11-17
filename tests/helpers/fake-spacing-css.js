module.exports = function fakeSpacingCSS(options, name) {
  return Object.keys(options).map( key => {
    var value = options[key];
    return '.' + ['n', key, name].join('-') + ' { ' + value + ' }';
  }).join('\n\n') + '\n';
};
