import test from 'tape';
import { zipWith, tail, getArray, take } from '../src';

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
  
  t.end();
});
