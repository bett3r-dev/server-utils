import { assert } from "chai";
import Async from "crocks/Async";
import * as mod from "./crocks";
import { traverse } from 'bett3r-utils';
import { identity } from "rambda";

describe("crocks", function () {
  describe("fromPromise", function () {
    it("Converts a resolved promise to a resolved Async instance", (done) => {
      const p = Promise.resolve("hola");
      mod.promiseToAsync(p).fork(done, (str) => {
        assert.equal(str, "hola");
        done();
      });
    });
    it("Converts a rejected promise to a rejected Async instance", (done) => {
      const p = Promise.reject("hola");
      mod.promiseToAsync(p).fork((str) => {
        assert.equal(str, "hola");
        done();
      }, done);
    });
  });

  describe("ensureAsync", function () {
    it("returns the same async if param is async", () => {
      const x = Async.of("2");
      const y = mod.ensureAsync(x);
      assert.equal(x, y);
    });
    it("returns an async if param is whatever type", done => {
      const asyncArray = [];
      const num = 345;
      const str = "345";
      const arr = [345];
      const obj = { n: 345 };
      const und = undefined;
      asyncArray.push(mod.ensureAsync(num));
      asyncArray.push(mod.ensureAsync(str));
      asyncArray.push(mod.ensureAsync(arr));
      asyncArray.push(mod.ensureAsync(obj));
      asyncArray.push(mod.ensureAsync(und));
      traverse(Async.of, identity, asyncArray)
        .fork(done, res => {
          assert.deepEqual(res, [345, '345', [345], {n:345}, undefined])
          done();
        })
    });
    it("returns an async if param is a promise", done => {
      const x = Promise.resolve("2");
      const y = mod.ensureAsync(x);
      y.fork(done, res => {
        assert.equal(res, '2');
        done();
      })
    });
  });
});
