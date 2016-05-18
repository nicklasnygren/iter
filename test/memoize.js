import test from 'tape';
import { memoize, take, getArray } from '../src';

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
    getArray(take(3, memoRand())),
    getArray(take(3, memoRand())),
    `memoize memoizes iterable`
  );
  
  t.end();
});

