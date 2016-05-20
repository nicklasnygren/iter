import test from 'tape';
import { zipWith, tail, take, isIterable, range, memoize } from '../src';

test('zipWith', t => {
  
  t.ok(zipWith
    , `zipWith should be defined`);
  
  t.ok(typeof zipWith === 'function'
    , `zipWith should be a function`);
  
  const fibonacci = memoize(function * () {
    yield 0;
    yield 1;
    yield * zipWith((x, y) => x + y, fibonacci(), tail(fibonacci()));
  });

  t.deepEqual(
    [...take(8, fibonacci())],
    [0, 1, 1, 2, 3, 5, 8, 13],
    `zipWith produces expected output`
  );

  // Currying
  const _zipWithSum = zipWith((...values) => values.reduce((sum, val) => sum + val, 0));
  t.ok(!isIterable(_zipWithSum)
    , `partially applied zipWith does not return iterable`);
  
  t.deepEqual(
    [...take(5, _zipWithSum(range(1, 5), range(6, 10), range(1, 3)))],
    [8, 11, 14],
    `curried zipWith produces expected output`
  );

  t.end();
});
