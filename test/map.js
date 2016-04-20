import test from 'tape';
import { map, intRange, getArray, isIterable } from '../src';

test('map', t => {
  
  t.ok(map
    , `map should be defined`);
  
  t.ok(typeof map === 'function'
    , `map should be a function`);

  t.ok(isIterable(map(Function.prototype, intRange(1, 3)))
    , `map returns iterable`);
  
  t.deepEqual(
    getArray(map(n => `num: ${n}`, intRange(1, 3))),
    ['num: 1', 'num: 2', 'num: 3'],
    `map behaves like Array.prototype.map`
  );

  // Currying
  const _parens = map(n => `(${n})`);
  t.ok(!isIterable(_parens)
    , `Partially applied map does not return iterable`);

  t.equal(typeof _parens, 'function'
    , `Partially applied map returns function`);
  
  t.ok(isIterable(_parens(intRange(1, 2)))
    , `Curried map produces iterable`);
  
  t.deepEqual(
    getArray(_parens(intRange(1, 2))),
    ['(1)', '(2)'],
    `Curried map produces expected output`
  );

  t.end();
});
