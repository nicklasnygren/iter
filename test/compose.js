import test from 'tape';
import { compose, filter, map, intRange, zipWith, take, compact } from '../src';

test('compose', t => {
  
  t.ok(compose
    , `compose should be defined`);
  
  t.ok(typeof compose === 'function'
    , `compose should be a function`);
  
  const _divisableByTwo = n => (n % 2) | 0;
  const _isPositive = n => !!n;

  t.deepEqual(
    [...compose(
      filter(_isPositive),
      map(_divisableByTwo),
      intRange(1, 6)
    )],
    [1, 1, 1],
    `compose composes iterators right to left`
  );
  
  t.deepEqual(
    [...compose(
        compose(compose(filter(n => !_isPositive(n)))), // Gratuitous use of compose :)
        map(_divisableByTwo)
      )(intRange(1, 6))
    ],
    [0, 0, 0],
    `compose returns function if leftmost argument not iterable`
  );

  const _fizzBuzz = compose(
    map(n => n % 3 === 0 ? 'fizz' : n),
    map(n => n % 5 === 0 ? 'buzz' : n),
    map(n => n % 5 === 0 && n % 3 === 0 ? 'fizzbuzz' : n),
    intRange(1, Infinity)
  );

  t.deepEqual(
    [...take(15, _fizzBuzz)],
    [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8 , 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz'],
    `Composition can provide interviewers with a much needed fizzBuzz algorithm`
  );

  t.end();
});
