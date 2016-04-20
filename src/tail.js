import getIterator from './getIterator';

export default function * tail(iterable) {
  const iterator = getIterator(iterable);
  iterator.next();
  yield * iterator;
}
