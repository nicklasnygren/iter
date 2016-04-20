import isIterable from './isIterable';

export default function getIterator(iterable) {
  if (!isIterable(iterable)) {
    throw new TypeError('Supplied object is not iterable');
  }
  return iterable[Symbol.iterator]();
}
