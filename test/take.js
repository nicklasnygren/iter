import test from 'tape';
import { take, intRange, isIterable } from '../src';

test('take', t => {
  
  t.ok(take
    , `take should be defined`);
  
  t.ok(typeof take === 'function'
    , `take should be a function`);

  t.ok(isIterable(take(3, intRange(1, 4)))
    , `take returns iterable`);
  
  t.deepEqual(
    [...take(3, intRange(1, 4))],
    [1, 2, 3],
    `take slices iterable from beginning`
  );

  // Currying
  const _take3 = take(3);
  t.ok(!isIterable(_take3)
    , `partially applied take does not return iterable`);
  
  t.ok(typeof _take3 === 'function'
    , `partially applied take returns function`);
  
  t.ok(isIterable(_take3(intRange(1, 10)))
    , `curried take returns iterable`);
  
  t.deepEqual(
    [..._take3(intRange(2, 6))],
    [2, 3, 4],
    `curried take produces expected output`
  );
  
  t.end();
});
