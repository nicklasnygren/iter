export default function * unique(iterable) {
  const set = new Set();
  for (const item of iterable) {
    if (!set.has(item)) {
      set.add(item);
      yield item;
    }
  }
};
