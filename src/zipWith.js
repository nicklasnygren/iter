import cu from 'auto-curry';

export default cu(function * zipWith (zipFn, it0, it1, ...itN) {
  const iterators = [it0, it1, ...itN];

  while (true) {
    const pairs = iterators.map(i => i.next());
    const dones = pairs.map(p => p.done);
    const values = pairs.map(p => p.value);

    if (dones.indexOf(true) !== -1) {
      break;
    }

    yield zipFn(...values);
  }
});
