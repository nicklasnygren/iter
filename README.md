iter [![Build Status](https://travis-ci.org/nicklasnygren/iter.svg?branch=master)](https://travis-ci.org/nicklasnygren/iter)
====

Utility library for functional programming based on ES2015 generators that ensures lazy evaluation of possibly infinite ranges.

### Examples

#### Fibonacci sequence up to the nth number

```js
import { zipWith, tail, take, getArray } from 'iter';

const fibonacci = function * () {
  yield 0;
  yield 1;
  yield * zipWith((x, y) => x + y, fibonacci(), tail(fibonacci()));
};

getArray(take(8, fibonacci()));
  // => [0, 1, 1, 2, 3, 5, 8, 13]
```

### Methods
 * `assertIterable(iterable)`
 * `filter(filterFn, iterable)`
 * `getArray(iterable)`
 * `getIterator(iterable)`
 * `isIterable(iterable)`
 * `map(mapFn, iterable)`
 * `slice(fromIdx, len, iterable)`
 * `tail(iterable)`
 * `take(num, iterable)`
 * `unqiue(iterable)`
 * `zipWith(zipFn, ...iterables)`

### Inspiration & further reading:
 * [Laziness is a virtue](http://raganwald.com/2016/04/15/laziness-is-a-virtue.html)
 * [Programs must be written for people to read](http://raganwald.com/2016/03/17/programs-must-be-written-for-people-to-read.html)
