export default obj =>
  obj
    ? typeof obj[Symbol.iterator] === 'function'
    : false;
