export default function isIterable(obj) {
  if (!obj) {
    return false;
  }
  if (typeof obj[Symbol.iterator] !== 'function') {
    return false;
  }
  return true;
};
