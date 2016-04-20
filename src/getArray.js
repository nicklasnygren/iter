import assertIterable from './assertIterable';

export default function (iterable) {
  assertIterable(iterable);
  return Array.from(iterable[Symbol.iterator]());
}
