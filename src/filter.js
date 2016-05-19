import cu from 'auto-curry';

export default cu(function * filter(filterFn, iterable) {
  for (const item of iterable) {
    if (filterFn(item)) {
      yield item;
    }
  }
});
