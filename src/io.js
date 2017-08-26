const IOProto = {
  from: effect => IO(effect),
  toString: () => 'IO'
};

function IO(effect) {
  return Object.create(IOProto, {
    map: {
      value: fn => {
        return IO(() => fn(effect()));
      }
    },
    chain: {
      value: fn => fn(effect())
    },
    run: {
      value: () => effect()
    }
  });
}

IO.of = effect => IO(effect);
module.exports = IO;
