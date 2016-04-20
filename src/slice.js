import getIterator from './getIterator';

export default function * slice(...params) {
  const start = params[0];
  const end = params.length === 3 ? start + params[1] : Infinity;
  const iterator = getIterator(params[params.length - 1]);
  let n = -1;

  for (const item of iterator) {
    if (++n >= start) {
      if (n >= end) {
        break;
      }
      yield item;
    }
  }
}
