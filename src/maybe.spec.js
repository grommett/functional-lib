import * as assert from 'assert';
import * as sinon from 'sinon';
import { Maybe, Just, Nothing } from './maybe';

const num = 42;

describe('Maybe', function() {
  describe('Just', function() {
    it('returns a Just', function() {
      const actual = Maybe.Just(num);
      const expected = Just(num);
      assert.deepEqual(actual, expected);
    });
  });

  describe('Nothing', function() {
    it('returns a Nothing', function() {
      const actual = Maybe.Nothing();
      const expected = Nothing();
      assert.deepEqual(actual, expected);
    });
  });

  describe('fromNullable', function() {
    it('returns a Just when input is a value', function() {
      const actual = Maybe.fromNullable(num);
      const expected = Just(num);
      assert.deepEqual(actual, expected);
    });

    it('returns a Nothing when input is undefined', function() {
      const actual = Maybe.fromNullable(undefined); // eslint-disable-line no-undefined
      const expected = Nothing();
      assert.deepEqual(actual, expected);
    });

    it('returns a Nothing when input is null', function() {
      const actual = Maybe.fromNullable(null);
      const expected = Nothing();
      assert.deepEqual(actual, expected);
    });
  });

  describe('of', function() {
    it('returns a Just with the value of its input', function() {
      const actual = Maybe.of(num);
      const expected = Just(num);
      assert.deepEqual(actual, expected);
    });
  });

  describe('isNothing', function() {
    it('returns false', function() {
      const actual = Maybe.isNothing();
      const expected = false;
      assert.deepEqual(actual, expected);
    });
  });

  describe('toString', function() {
    it('returns Maybe', function() {
      const actual = Maybe.toString();
      const expected = 'Maybe';
      assert.strictEqual(actual, expected);
    });
  });

  describe('isJust', function() {
    it('returns false', function() {
      const actual = Maybe.isJust();
      const expected = false;
      assert.deepEqual(actual, expected);
    });
  });
});

describe('Just', function() {
  describe('map', function() {
    it('calls its input function', function() {
      const spy = sinon.spy();
      const just = Just(num);
      just.map(spy);
      assert.equal(spy.called, true);
    });

    it('calls its input function and pass its value', function() {
      const spy = sinon.spy();
      const just = Just(num);
      just.map(spy);
      assert.equal(spy.calledWith(num), true);
    });
  });

  describe('getOrElse', function() {
    it('returns its value', function() {
      const expected = num;
      const just = Just(num);
      const actual = just.getOrElse('not return this');
      assert.equal(actual, expected);
    });
  });

  describe('isJust', function() {
    it('returns true', function() {
      const expected = true;
      const just = Just(num);
      const actual = just.isJust();
      assert.equal(actual, expected);
    });
  });

  describe('isNothing', function() {
    it('returns false', function() {
      const expected = false;
      const just = Just(num);
      const actual = just.isNothing();
      assert.equal(actual, expected);
    });
  });

  describe('toString', function() {
    it('returns `Just(<value>)`', function() {
      const expected = 'Just(42)';
      const just = Just(num);
      const actual = just.toString();
      assert.equal(actual, expected);
    });
  });
});

describe('Nothing', function() {
  describe('map', function() {
    it('calls the function passed to its args', function() {
      const nothing = Nothing();
      const spy = sinon.spy();
      nothing.map(spy);
      assert.equal(spy.notCalled, true);
    });

    it('returns itself', function() {
      const nothing = Nothing();
      const spy = sinon.spy();
      const actual = nothing.map(spy);
      assert.deepEqual(actual, nothing);
    });
  });

  describe('getOrElse', function() {
    it('returns the passed default value', function() {
      const nothing = Nothing();
      const expected = 'return this';
      const actual = nothing.getOrElse(expected);
      assert.equal(actual, expected);
    });
  });

  describe('isNothing', function() {
    it('returns true', function() {
      const nothing = Nothing();
      const expected = true;
      const actual = nothing.isNothing();
      assert.equal(actual, expected);
    });
  });

  describe('isJust', function() {
    it('returns false', function() {
      const nothing = Nothing();
      const expected = false;
      const actual = nothing.isJust();
      assert.equal(actual, expected);
    });
  });

  describe('get', function() {
    it('should throw', function() {
      const nothing = Nothing();
      assert.throws(() => nothing.value());
    });
  });

  describe('toString', function() {
    it('returns `Nothing()`', function() {
      const expected = 'Nothing()';
      const nothing = Nothing();
      const actual = nothing.toString();
      assert.equal(actual, expected);
    });
  });
});
