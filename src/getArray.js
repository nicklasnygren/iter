import isIterable from './isIterable';

export default function (iterable) {
  if (!isIterable(iterable)) {
    throw new TypeError('Supplied object is not iterable');
  }
  return Array.from(iterable[Symbol.iterator]());
}
