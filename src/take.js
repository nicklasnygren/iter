import cu from 'auto-curry';
import slice from './slice';

export default cu(function * take(len, iterable) {
  let n = 0;
  for (const item of iterable) {
    if (++n > len) {
      break;
    }
    yield item;
  }
});
