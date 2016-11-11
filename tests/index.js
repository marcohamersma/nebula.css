var test = require('tape');
var nebula = require('../index');
var camelize = require('camelize');
var sass = require('node-sass');
var fs = require('mz/fs');
const path = require('path');

test('Outfile option should generate an actual file', t => {
  t.plan(1);
  nebula.build(null, {
    outFile: path.join(__dirname, 'output.scss'),
    useSourceMap: false
  }).then( filename => fs.readFile(filename, 'utf8') )
    .then( contents => t.ok(contents) )
    .catch( t.fail );
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
