import test from 'tape';
import { filter, range, isIterable } from '../src';

test('filter', t => {
  
  t.ok(filter
    , `filter should be defined`);
  
  t.ok(filter
    , `filter should be a function`);

  t.ok(isIterable(filter(Function.prototype, range(1, 5)))
    , `filter returns iterable`);
  
  t.deepEqual(
    [...filter(n => n < 3, range(1, 5))],
    [1, 2],
    `filter produces expected output`
  );

  const _filterUnder3 = filter(n => n < 3);
  t.ok(!isIterable(_filterUnder3)
    , `partially applied filter does not return iterable`);
  

  t.ok(typeof _filterUnder3 === 'function'
    , `partially applied filter returns function`);
  
  t.deepEqual(
    [..._filterUnder3(range(1, 1e3))],
    [1, 2],
    `curried filter produces expected output`
  );

  t.end();
});
