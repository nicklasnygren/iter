import test from 'tape';
import { getArray, intRange } from '../src';

test('getArray', t => {
  
  t.ok(getArray
    , `getArray should be defined`);
  
  t.ok(typeof getArray === 'function'
    , `getArray is a function`);
  
  t.deepEqual(
    getArray([1, 2, 3]),
    [1, 2, 3],
    `getArray returns copy if fed array`
  );

  t.deepEqual(
    getArray(intRange(1, 3)),
    [1, 2, 3],
    `getArray returns array representation of iterables`
  );
  
  t.end();
});
