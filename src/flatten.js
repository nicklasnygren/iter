import isIterable from './isIterable';
import getIterator from './getIterator';

export default function flatten(maxDepth, iterable, depth = 0) {
  if (isIterable(arguments[arguments.length - 1])) {
    iterable = arguments[arguments.length -1];
  }

  maxDepth = isFinite(maxDepth)
    ? maxDepth
    : Infinity;

  if (isIterable(iterable)) {
    return (function * () {
      for (const item of getIterator(iterable)) {
        if (isIterable(item) && depth < maxDepth) {
          yield * flatten(maxDepth, item, depth + 1);
        }
        else {
          yield item;
        }
      }
    }).call(this);
  }

  return iterable => flatten(maxDepth, iterable, depth);
};
