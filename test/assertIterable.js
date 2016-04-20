import test from 'tape';
import { assertIterable } from '../src';

test('assertIterable', t => {
  
  t.throws(
    () => assertIterable(1),
      `assertIterable throws error if supplied argument is not iterable`);

  t.doesNotThrow(
    () => assertIterable([1, 2, 3]),
      `assertIterable does not throw error if supplied argument is iterable`);

  t.end();
});
