import test from 'tape';
import { compose, filter, map, intRange, getArray } from '../src';

test('compose', t => {
  
  t.ok(compose
    , `compose should be defined`);
  
  t.ok(typeof compose === 'function'
    , `compose should be a function`);
  
  const _divisableByTwo = n => (n % 2) | 0;
  const _isPositive = n => !!n;

  t.deepEqual(
    getArray(
      compose(
        filter(_isPositive),
        map(_divisableByTwo),
        intRange(1, 6)
      )
    ),
    [1, 1, 1],
    `compose composes iterators right to left`
  );
  
  t.deepEqual(
    getArray(
      compose(
        compose(compose(filter(n => !_isPositive(n)))), // Gratuitous use of compose :)
        map(_divisableByTwo)
      )(intRange(1, 6))
    ),
    [0, 0, 0],
    `compose returns function if leftmost argument not iterable`
  );

  t.end();
});
