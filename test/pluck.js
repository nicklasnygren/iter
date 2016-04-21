import test from 'tape';
import { pluck, compose, compact, unique, getArray } from '../src';

test('pluck', t => {
  
  t.ok(pluck
    , `pluck should be defined`);

  t.ok(typeof pluck === 'function'
    , `pluck should be a function`);
  
  const _getUniqueTruthyOccupations = compose(
    compact,
    unique,
    pluck('occupation')
  );

  const _people = [{
    name: 'Test 1',
    occupation: 'Foo',
  }, {
    name: 'Test 2',
    occupation: 'Bar',
  }, {
    name: 'Test 3',
    occupation: null,
  }, {
    name: 'Test 4',
    occupation: 'Foo'
  }];

  t.deepEqual(
    getArray(_getUniqueTruthyOccupations(_people)),
    ['Foo', 'Bar'],
    `pluck maps out the provided property from each item`
  );

  t.end();
});
