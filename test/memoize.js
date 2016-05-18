import test from 'tape';
import { memoize, take } from '../src';

test('memoize', t => {
  
  t.ok(memoize
    , `memoize should be defined`);
  
  t.ok(typeof memoize === 'function'
    , `memoize should be a function`);

  const rand = function * () {
    while (true) {
      yield Math.random();
    }
  };

  const memoRand = memoize(rand);

  t.deepEqual(
    [...take(3, memoRand())],
    [...take(3, memoRand())],
    `memoize memoizes iterable`
  );
  
  t.end();
});

