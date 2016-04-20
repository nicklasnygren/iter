import cu from 'auto-curry';
import getIterator from './getIterator';

export default cu(function * map(mapFn, iterable) {
  for (const item of getIterator(iterable)) {
    yield mapFn(item);
  }
});
