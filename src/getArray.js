import getIterator from './getIterator';

export default function (iterable) {
  return Array.from(getIterator(iterable));
}
