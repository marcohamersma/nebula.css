var test = require('tape');
var nebula = require('../index');
var camelize = require('camelize');
var sass = require('node-sass');
var fs = require('mz/fs');
var fakeSpacingCSS = require('./helpers/fake-spacing-css');
const exec = require('child_process').exec;
const path = require('path');

test('Outfile option should generate an actual file', t => {
  t.plan(2);
  nebula.build(null, {
    outFile: path.join(__dirname, 'output.css')
  }).then( filename => {
    fs.readFile(filename, 'utf8')
      .then( contents => t.ok(contents) )
      .catch( t.fail );

    fs.readFile(filename + '.map', 'utf8')
      .then( contents => t.ok(contents) )
      .catch( t.fail );

  }).catch( t.fail );
});

test('module isolation', t => {
  t.plan(nebula.defaultModules.length);

  nebula.defaultModules.forEach( m => {
    nebula.build(null, { modules: [m], borderColors: ['black'] }).then(result => {
      t.ok(result, `Module '${m}' should be able to render in isolation`);
    }).catch( t.fail );
  });
});

test('`use-module` options', t => {
  const testModules = nebula.defaultModules.filter( n => n !== 'banner');
  t.plan(testModules.length);

  testModules.forEach( m => {
    const options = {
      modules: [m]
    };
    const optionName = camelize('use-' + m);
    options[optionName] = false;

    nebula.build(null, options).then(result => {
      t.ok(result.length === 0, `Module '${m}' should be empty when $${optionName} is false`);
    }).catch( t.fail );
  });
});

test('consistency between default sass version and javascript version', t => {
  t.plan(1);

  var libSassOutput = sass.renderSync({
    file: require('path').join(__dirname, '../scss/nebula.scss'),
    outputStyle: 'compact',
    sourceMap: true
  }).css.toString();

  nebula.build().then(buildOutput => {
    t.equal(buildOutput, libSassOutput);
  }).catch(t.fail);
});

test('extra scss', t => {
  t.plan(1);
  nebula.build(null, { extraScss: '.omgLolWtf { color: red; }' }).then(result => {
    t.ok(result.indexOf('.omgLolWtf') > 0);
  }).catch( t.fail );
});

test('new spacing behaviour', t => {
  t.plan(3);

  function buildWithExtra(extraScss) {
    return nebula.build(null, {
      modules: ['spacing'],
      useSpacing: false,
      spacingValues: { medium: 10 },
      spacingDirections: ['top', 'left'],
      extraScss: extraScss
    });
  }

  buildWithExtra('@include scale-spacing(1, 1);').then(result => {
    t.equal(result, fakeSpacingCSS({
      'spacing':  'margin: 10px 10px;',
      'vspacing': 'margin-top: 10px; margin-bottom: 10px;',
      'hspacing': 'margin-left: 10px; margin-right: 10px;',
      'frame':    'margin: -10px -10px;',
      'padding':  'padding: 10px 10px;',
      'vpadding': 'padding-top: 10px; padding-bottom: 10px;',
      'hpadding': 'padding-left: 10px; padding-right: 10px;',
      'spacing-top': 'margin-top: 10px;',
      'padding-top': 'padding-top: 10px;',
      'spacing-left': 'margin-left: 10px;',
      'padding-left': 'padding-left: 10px;',
    }, 'medium'));
  }).catch( t.fail );

  buildWithExtra('@include scale-spacing(2);').then(result => {
    t.equal(result, fakeSpacingCSS({
      'spacing':  'margin-top: 20px; margin-bottom: 20px;',
      'vspacing': 'margin-top: 20px; margin-bottom: 20px;',
      'frame':    'margin-top: -20px; margin-bottom: -20px;',
      'padding':  'padding-top: 20px; padding-bottom: 20px;',
      'vpadding': 'padding-top: 20px; padding-bottom: 20px;',
      'spacing-top': 'margin-top: 20px;',
      'padding-top': 'padding-top: 20px;',
    }, 'medium'), 'Should not print horizontal margins');
  }).catch( t.fail );

  buildWithExtra('@include scale-spacing(null, 2);').then(result => {
    t.equal(result, fakeSpacingCSS({
      'spacing':  'margin-left: 20px; margin-right: 20px;',
      'hspacing': 'margin-left: 20px; margin-right: 20px;',
      'frame':    'margin-left: -20px; margin-right: -20px;',
      'padding':  'padding-left: 20px; padding-right: 20px;',
      'hpadding': 'padding-left: 20px; padding-right: 20px;',
      'spacing-left': 'margin-left: 20px;',
      'padding-left': 'padding-left: 20px;',
    }, 'medium'), 'Should not print vertical margins');
  }).catch( t.fail );
});

const bannerText = '/*! Powered by nebula.css, by Marco Hamersma (https://github.com/marcohamersma/) */';

test('configuration file through CLI', t => {
  t.plan(2);

  exec('node cli.js -c tests/config-file-test.json', (error, stdout, stderror) => {
    if (stderror || error) t.fail(error || stderror);

    t.equal(stdout.trim(), bannerText, 'Loading configuration file should output only banner');
  });

  exec('node cli.js -c trolololo.json', (e, output) => {
    t.equal(
      output && output.indexOf('ENOENT') > 0,
      true,
      'should return ENOENT (file not found) when config file doesn\'t exist'
    );
  });
});

test('configuration file through API', t => {
  t.plan(2);

  nebula.build(null, { config: 'tests/config-file-test.json' }).then(result => {
    t.equal(result.trim(), bannerText, 'Loading configuration file should output only banner');
  }).catch( t.fail );

  nebula.build(null, { config: 'trollololo.json' })
    .then( () => t.fail('Should reject when file is not found'))
    .catch( error => {
      t.equal(
        error && error.code,
        'ENOENT',
        'Should reject when file is not found'
      );
    });
});
