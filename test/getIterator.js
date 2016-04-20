import test from 'tape';
import { getIterator } from '../src';

test('getIterator', t => {
  
  t.ok(getIterator
    , `getIterator should be defined`);
  
  t.ok(typeof getIterator === 'function'
    , `getIterator should be a function`);
  
  t.ok(typeof getIterator([1, 2, 3]) === 'object'
    , `getIterator returns object`);
  
  for (let num of getIterator([1, 2])) {
    t.ok(typeof num === 'number'
      , `getIterator produces iterator(${num})`);
  }

  t.end();
});
