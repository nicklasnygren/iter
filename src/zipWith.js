import getIterator from './getIterator';

export default function * zipWith (zipper, ...iterables) {
  const iterators = iterables.map(getIterator);

  while (true) {
    const pairs = iterators.map(i => i.next());
    const dones = pairs.map(p => p.done);
    const values = pairs.map(p => p.value);

    if (dones.indexOf(true) !== -1) {
      break;
    }

    yield zipper(...values);
  }
};
