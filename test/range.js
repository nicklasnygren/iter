import test from 'tape';
import { isIterable, range } from '../src';

test('range', t => {

  t.ok(range
    , `range should be defined`);

  t.ok(isIterable(range(1, 5))
    , `range returns iterable`);

  t.deepEqual(
    Array.from(range(1, 5)),
    [1, 2, 3 , 4, 5],
    `range produces a range of integers`
  );

  // Currying
  const _rangeFromTwo = range(2);

  t.ok(!_rangeFromTwo[Symbol.iterator]
    , `Partially applied range does not return iterable`);
  
  t.ok(typeof _rangeFromTwo(5)[Symbol.iterator] === 'function'
    , `Curried range produces iterable`);

  t.deepEqual(
    Array.from(_rangeFromTwo(4)),
    [2, 3, 4],
    `Curried range iterable produces expected output`
  );
  
  t.end();
});
