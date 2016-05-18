import test from 'tape';
import { tail, intRange } from '../src';

test('tail', t => {

  t.ok(tail
    , `tail should be defined`);

  t.ok(typeof tail === 'function'
    , `tail should be a function`);
  
  t.deepEqual(
    [...tail(intRange(1, 5))],
    [2, 3, 4, 5],
    `tail returns entire iterable chain except first item`
  );
  
  t.end();
});
