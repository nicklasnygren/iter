import assertIterable from './assertIterable';

export default function getIterator(iterable) {
  assertIterable(iterable);
  return iterable[Symbol.iterator]();
}
