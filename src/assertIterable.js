import isIterable from './isIterable';

export default function assertIterable(iterable) {
  if (!isIterable(iterable)) {
    throw new TypeError('Supplied object is not iterable');
  }
};
