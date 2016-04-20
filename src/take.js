import cu from 'auto-curry';
import slice from './slice';

export default cu(function take(len, iterable) {
  return slice(0, len, iterable);
});
