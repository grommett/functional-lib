'use strict';

const Maybe = {
  Just: function(val) {
    return Just(val);
  },

  Nothing: function() {
    return Nothing();
  },

  fromNullable: function(val) {
    return val ? Just(val) : Nothing();
  },

  of: function(val) {
    return Just(val);
  },

  isNothing: function() {
    return false;
  },

  isJust: function() {
    return false;
  },

  toString: () => 'Maybe'
};

const JustProto = Object.create(Maybe, {
  map: {
    value: function(f) {
      return this.of(f(this.value));
    }
  },

  getOrElse: {
    value: function() {
      return this.value;
    }
  },

  isJust: {
    value: () => true
  },

  toString: {
    value: function() {
      return `Just(${this.value})`;
    }
  }
});

const NothingProto = Object.create(Maybe, {
  map: {
    value: function() {
      return this;
    }
  },

  value: {
    get: () => {
      throw new TypeError('Can\'t extract the value of a Nothing.');
    }
  },

  getOrElse: {
    value: function(other) {
      return other;
    }
  },

  isNothing: {
    value: () => true
  },

  toString: {
    value: () => 'Nothing()'
  }
});

function Just(val) {
  return Object.create(JustProto, {
    value: {
      value: val
    }
  });
}

function Nothing() {
  return Object.create(NothingProto);
}

module.exports = {
  Maybe,
  Just,
  Nothing
};
