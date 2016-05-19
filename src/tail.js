export default function * tail(iterable) {
  iterable.next();
  yield * iterable;
}
