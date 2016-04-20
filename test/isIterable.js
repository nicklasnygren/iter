import test from 'tape';
import { isIterable } from '../src';

test('isIterable', t => {
  
  t.ok(isIterable
    , `isIterable should be defined`);
  
  t.ok(typeof isIterable === 'function'
    , `isIterable should be a function`);
  
  t.equal(isIterable([1, 2, 3][Symbol.iterator]()), true
    , `isIterable recognizes iterables (1)`);
  
  t.equal(isIterable([1, 2, 3]), true
    , `isIterable recognizes iterables (2)`);
  
  t.end();
});
