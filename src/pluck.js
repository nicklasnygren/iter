import cu from 'auto-curry';
import map from './map';

export default cu(function * pluck(prop, iterable) {
  yield * map(item => item[prop], iterable);
});
