import cu from 'auto-curry';
import getIterator from './getIterator';

export default cu(function * filter(filterFn, iterable) {
  const iterator = getIterator(iterable);
  for (const item of iterable) {
    if (filterFn(item)) {
      yield item;
    }
  }
});
