var test = require('blue-tape');
var nebula = require('../index');

function noop() {};

test('modularity', t => {
  t.plan(nebula.defaultModules.length);

  nebula.defaultModules.forEach( m => nebula.build([m], null, {}, result => {
    t.ok(result, `Module '${m}' should work in isolation`);
  }));
});
