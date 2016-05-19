import isIterable from './isIterable';

export default function compose(...iterables) {
  const iterator = function * (iterable) {
    yield * iterables
      .reverse()
      .reduce((prev, cur) => cur(prev), iterable)
  }

  if (isIterable(iterables[iterables.length - 1])) {
    return iterator(iterables.pop());
  }
  else {
    return iterator;
  }
};
