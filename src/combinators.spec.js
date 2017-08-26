import * as assert from 'assert';
import * as sinon from 'sinon';
import { alt, identity, tap } from './combinators';

describe('combinators', function() {
  describe('alt', function() {
    it('accepts two arguments', function() {
      const expected = 2;
      const actual = alt.length;
      assert.equal(actual, expected);
    });
    it('always calls its first argument', function() {
      const val = 1;
      const leftFn = sinon.stub().returns('hi');
      const rightFn = sinon.stub().returns(false);
      const testFn = alt(leftFn, rightFn);
      testFn(val);
      assert.equal(leftFn.called, true);
    });

    it('does not call second argument if return value of first argument is `truthy`', function() {
      const val = 1;
      const leftFn = sinon.stub().returns('test');
      const rightFn = sinon.stub().returns(false);
      const testFn = alt(leftFn, rightFn);
      testFn(val);
      assert.equal(rightFn.called, false);
    });

    it('returns first arguments value if it is `truthy`', function() {
      const expected = 'test';
      const leftFn = sinon.stub().returns(expected);
      const rightFn = sinon.stub().returns(false);
      const testFn = alt(leftFn, rightFn);
      const actual = testFn(expected);
      assert.equal(actual, expected);
    });

    it('calls second argument if first argument returns `falsey`', function() {
      const val = 1;
      const leftFn = sinon.stub().returns(false);
      const rightFn = sinon.stub().returns(false);
      const testFn = alt(leftFn, rightFn);
      testFn(val);
      assert.equal(rightFn.called, true);
    });

    it('returns second arguments value if first argument returns `falsey`', function() {
      const expected = 1;
      const leftFn = sinon.stub().returns(false);
      const rightFn = sinon.stub().returns(expected);
      const testFn = alt(leftFn, rightFn);
      const actual = testFn('test');
      assert.equal(actual, expected);
    });

    it('throws if first argument is not a function', function() {
      assert.throws(() => alt(1, () => 1));
    });

    it('throws if second argument is not a function', function() {
      assert.throws(() => alt(() => 1, 2));
    });
  });

  describe('identity', function() {
    it('accepts one argument', function() {
      const expected = 1;
      const actual = identity.length;
      assert.equal(actual, expected);
    });

    it('returns its argument', function() {
      const expected = 1;
      const actual = identity(expected);
      assert.equal(actual, expected);
    });
  });

  describe('tap', function() {
    it('accepts two arguments', function() {
      const expected = 2;
      const actual = tap.length;
      assert.equal(actual, expected);
    });
    it('calls the function passed to it with the value argument', function() {
      const fn = sinon.spy();
      const val = 'test';
      tap(fn, val);
      assert.equal(fn.calledWith(val), true);
    });

    it('returns the value argument', function() {
      const fn = sinon.spy();
      const expected = 'test';
      const actual = tap(fn, expected);
      assert.equal(actual, expected);
    });

    it('throws if first argument is not a function', function() {
      assert.throws(() => tap('test', 'test'));
    });

    it('throws if second argument is falsey', function() {
      assert.throws(() => tap(val => val, ''));
    });
  });
});
