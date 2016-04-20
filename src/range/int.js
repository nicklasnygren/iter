import cu from 'auto-curry';

export default cu(function * intRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
});
