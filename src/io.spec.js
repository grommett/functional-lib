import * as assert from 'assert';
import * as sinon from 'sinon';
import IO from './io';

const log = () => console.log('hi'); // eslint-disable-line no-console

describe('IO', function() {
  it('accepts one argument', function() {
    const actual = IO.length;
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  describe('toString', function() {
    it('returns `IO`', function() {
      const actual = IO.of(log).toString();
      const expected = 'IO';
      assert.strictEqual(actual, expected);
    });
  });

  describe('of', function() {
    it('creates an IO', function() {
      const actual = IO.of(log).toString();
      const expected = 'IO';
      assert.strictEqual(actual, expected);
    });
  });

  describe('from', function() {
    it('creates an IO', function() {
      const actual = IO.of(log).toString();
      const expected = 'IO';
      assert.strictEqual(actual, expected);
    });
  });

  describe('map', function() {
    it('creates a new IO with the input function as its new effect which calls the original effect', function() {
      const returns21 = sinon.stub().returns(21);
      const mappedFn = sinon.spy();

      IO(returns21).map(mappedFn).run();

      assert.strictEqual(mappedFn.called, true);
      assert.strictEqual(returns21.called, true);
      assert.strictEqual(mappedFn.calledWith(21), true);
    });
  });

  describe('chain', function() {
    it('calls input function with the return value of the original effect', function() {
      const value = 21;
      const returns21 = sinon.stub().returns(value);
      const chainedFn = sinon.stub().returnsArg(0);
      const actual = IO(returns21).chain(chainedFn);

      assert.strictEqual(chainedFn.called, true);
      assert.strictEqual(returns21.called, true);
      assert.strictEqual(chainedFn.calledWith(21), true);
      assert.strictEqual(actual, value);
    });
  });
});
