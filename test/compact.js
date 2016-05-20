import test from 'tape';
import { compact, map, range } from '../src';

test('compact', t => {
  
  t.ok(compact
    , `compact should be defined`);
  
  t.ok(typeof compact === 'function'
    , `compact should be a function`);

  t.deepEqual(
    [...compact(map(n => n % 2 === 0 ? n : null, range(1, 10)))],
    [2, 4, 6, 8, 10],
    `compact filters out falsy values (1)`
  );

  t.deepEqual(
    [...compact(map(n => n % 2 === 0 ? false : n, range(0, 10)))],
    [1, 3, 5, 7, 9],
    `compact filters out falsy values (2)`
  );
  
  t.end();
});
