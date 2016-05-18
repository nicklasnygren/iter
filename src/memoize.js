export default function memoize(generator, keyGetter = JSON.stringify) {
  const memos = {};
  const iterators = {};

  return function * (...args) {
    const key = keyGetter(...args);
    let i = 0;

    if (!memos[key]) {
      memos[key] = [];
      iterators[key] = generator(...args);
    }

    while (true) {
      if (i < memos[key].length) {
        yield memos[key][i++];
      }
      else {
        const { done, value } = iterators[key].next();

        if (done) {
          return;
        }
        else {
          yield memos[key][i++] = value;
        }
      }
    }
  };
}
