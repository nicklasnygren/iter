import getIterator from './getIterator';
import isIterable from './isIterable';

export default function compose(...iterables) {
  const iterator = function * (iterable) {
    yield * iterables
      .reverse()
      .reduce((iterator, iterable) => iterable(iterator), iterable)
  }

  if (isIterable(iterables[iterables.length - 1])) {
    return iterator(iterables.pop());
  }
  else {
    return iterator;
  }
};
