import cu from 'auto-curry';
import slice from './slice';

export default cu(function * take(len, iterable) {
  yield * slice(0, len, iterable);
});
