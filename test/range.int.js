import test from 'tape';
import { intRange } from '../src';

test('intRange', t => {

  t.ok(intRange
    , `intRange should be defined`);

  t.ok(typeof intRange(1, 5)[Symbol.iterator] === 'function'
    , `intRange produces iterator`);

  t.deepEqual(
    Array.from(intRange(1, 5)),
    [1, 2, 3 , 4, 5],
    `intRange produces a range of integers`
  );

  // Currying
  const rangeFromTwo = intRange(2);

  t.ok(!rangeFromTwo[Symbol.iterator]
    , `Partially applied intRange does not return iterable`);
  
  t.ok(typeof rangeFromTwo(5)[Symbol.iterator] === 'function'
    , `Curried intRange produces iterable`);

  t.deepEqual(
    Array.from(rangeFromTwo(4)),
    [2, 3, 4],
    `Curried intRange iterable produces expected output`
  );
  
  t.end();
});
