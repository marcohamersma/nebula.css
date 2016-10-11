var test = require('blue-tape');
var nebula = require('../index');

function noop() {};

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
