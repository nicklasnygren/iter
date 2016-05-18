import test from 'tape';
import { unique, isIterable, take, map } from '../src';

test('unique', t => {
  
  t.ok(unique
    , `unique should be defined`);
  
  t.ok(typeof unique === 'function'
    , `unique should be a function`);
  
  const _cardSuites = map(
    n => {
      switch (n) {
        case 0:
          return 'clubs';
        case 1:
          return 'diamonds';
        case 2:
          return 'hearts';
        case 3:
          return 'spades';
        default:
          return 'unknown';
      }
    },
    (function * () {
      let n = -1;
      while (true) {
        yield ++n / 13 | 0;
      }
    }())
  );

  t.deepEqual(
    [...unique(take(52, _cardSuites))],
    ['clubs', 'diamonds', 'hearts', 'spades'],
    `unique produces expected output`
  );

  t.deepEqual(
    [...unique([{ foo: 'bar' }, { foo: 'bar' }])],
    [{ foo: 'bar' }, { foo: 'bar' }],
    `unique does not do deep comparisons`
  );

  t.end();
});
