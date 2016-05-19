import test from 'tape';
import { flatten } from '../src';

test('flatten', t => {
  
  t.ok(flatten
    , `flatten should be defined`);
  
  t.ok(typeof flatten === 'function'
    , `flatten should be a function`);
  
  t.deepEqual(
    [...flatten([1, [2, [3, 4], 5]])],
    [1, 2, 3, 4, 5],
    `Flatten flattens iterables`
  );
  
  t.deepEqual(
    [...flatten(1, [1, [2, [3, 4], 5]])],
    [1, 2, [3, 4], 5],
    `Flatten can limit amount of levels to flatten`
  );
  
  t.end();
});
