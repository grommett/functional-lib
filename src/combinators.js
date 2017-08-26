function alt(func1, func2) {
  functionOrThrows('alt', '1 and 2', func1, func2);
  return function(val) {
    return func1(val) || func2(val);
  };
}

function identity(val) {
  return val;
}

function tap(fn, val) {
  functionOrThrows('tap', 1, fn);
  existsOrThrows('tap', 2, val);
  fn(val);
  return val;
}

function functionOrThrows(fnName, argPos, ...fns) {
  fns.forEach(fn => {
    if (typeof fn !== 'function') {
      throw new TypeError(
        `${fnName}'s argument(s) ${argPos} must be a function`
      );
    }
    return fns;
  });
}

function existsOrThrows(fnName, argPos, val) {
  if (val !== false && !val) {
    throw new TypeError(
      `${fnName}'s argument ${argPos} cannot be falsey`
    );
  }
  return val;
}

module.exports = {
  alt,
  identity,
  tap
};
