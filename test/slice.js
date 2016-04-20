import test from 'tape';
import { slice, intRange, getArray } from '../src';

test('slice', t => {
  
  t.ok(slice
    , `slice should be defined`);
  
  t.ok(typeof slice === 'function'
    , `slice should be a function`);
  
  t.deepEqual(
    getArray(slice(1, 3, intRange(1, 5))),
    [2, 3, 4],
    `slice cuts iterable from start to end (1)`
  );
  
  t.deepEqual(
    getArray(slice(2, intRange(1, 5))),
    [3, 4, 5],
    `slice cuts iterable from start to end (2)`
  );
  
  t.deepEqual(
    getArray(slice(2, 200, intRange(1, 5))),
    [3, 4, 5],
    `slice cuts iterable from start to end (3)`
  );

  t.end();
});