import filter from './filter';

export default function * compact(iterable) {
  yield * filter(i => i, iterable);
};
