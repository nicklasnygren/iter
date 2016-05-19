import cu from 'auto-curry';

export default cu(function * map(mapFn, iterable) {
  for (const item of iterable) {
    yield mapFn(item);
  }
});
