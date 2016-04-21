import test from 'tape';
import { zipWith, tail, getArray, take, isIterable, intRange } from '../src';

test('zipWith', t => {
  
  t.ok(zipWith
    , `zipWith should be defined`);
  
  t.ok(typeof zipWith === 'function'
    , `zipWith should be a function`);
  
  const fibonacci = function * () {
    yield 0;
    yield 1;
    yield * zipWith((x, y) => x + y, fibonacci(), tail(fibonacci()));
  };

  t.deepEqual(
    getArray(take(8, fibonacci())),
    [0, 1, 1, 2, 3, 5, 8, 13],
    `zipWith produces expected output`
  );

  // Currying
  const _zipWithSum = zipWith((...values) => values.reduce((sum, val) => sum + val, 0));
  t.ok(!isIterable(_zipWithSum)
    , `partially applied zipWith does not return iterable`);
  
  t.deepEqual(
    getArray(take(5, _zipWithSum(intRange(1, 5), intRange(6, 10), intRange(1, 3)))),
    [8, 11, 14],
    `curried zipWith produces expected output`
  );

  t.end();
});
