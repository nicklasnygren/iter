import test from 'tape';
import { isIterable, intRange } from '../src';

test('intRange', t => {

  t.ok(intRange
    , `intRange should be defined`);

  t.ok(isIterable(intRange(1, 5))
    , `intRange returns iterable`);

  t.deepEqual(
    Array.from(intRange(1, 5)),
    [1, 2, 3 , 4, 5],
    `intRange produces a range of integers`
  );

  // Currying
  const _rangeFromTwo = intRange(2);

  t.ok(!_rangeFromTwo[Symbol.iterator]
    , `Partially applied intRange does not return iterable`);
  
  t.ok(typeof _rangeFromTwo(5)[Symbol.iterator] === 'function'
    , `Curried intRange produces iterable`);

  t.deepEqual(
    Array.from(_rangeFromTwo(4)),
    [2, 3, 4],
    `Curried intRange iterable produces expected output`
  );
  
  t.end();
});
