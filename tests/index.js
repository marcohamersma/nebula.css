var test = require('blue-tape');
var nebula = require('../index');
var sass = require('node-sass');
var fs = require('mz/fs');
const path = require('path');
const testFile = path.join(__dirname, 'userfile.scss');

function noop() {};

test('API', t => {
  t.plan(1);
  nebula.build(testFile, {
    useReset: false
  }).then( t.ok )
    .catch( t.fail );
});

test('API with outfile', t => {
  t.plan(1);
  nebula.build(testFile, {
    outFile: path.join(__dirname, 'output.scss')
  }).then( filename => fs.readFile(filename, 'utf8') )
    .then( contents => t.ok(contents) )
    .catch( t.fail );
});

test('isolation', t => {
  t.plan(nebula.defaultModules.length);

  nebula.defaultModules.forEach( m => nebula.build([m], null, {}, result => {
    t.ok(result, `Module '${m}' should work in isolation`);
  }));
});

test('modularity', t => {
  const testModules = nebula.defaultModules.filter( n => n !== 'banner');
  t.plan(testModules.length);

  testModules.forEach( m => {
    const options = {};
    options['use-' + m] = false;

    nebula.build([m], null, options, result => {
      t.ok(result.length === 0, `Module '${m}' should be empty when $${'use-' + m} is false`);
    });
  });
})

test('consistency', t => {
  t.plan(1);

  var libSassOutput = sass.renderSync({
    file: require('path').join(__dirname, '../scss/nebula.scss'),
    outputStyle: 'compact',
    sourceMap: true
  }).css.toString();

  nebula.build(null, null, {}, buildOutput => {
    t.equal(buildOutput, libSassOutput);
  });
});
