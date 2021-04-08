import { assert } from "chai";
import * as mod from "./index";

describe("index", function () {
  it("has elements from all the different modules", () => {
    // Transducers
    assert.exists(mod.Transducers);
    assert.exists(mod.Transducers.seq);
    // Stream
    assert.exists(mod.Stream)
    assert.exists(mod.Stream.stream)
    // bett3r-utils
    assert.exists(mod.ensureArray)
    assert.exists(mod.ensureAsync)
    // rambda
    assert.exists(mod.compose)

    // ServerUtils
    // hashing
    assert.exists(mod.md5Encode)
    // http
    assert.exists(mod.fetchAsync)
    // modules
    assert.exists(mod.loadModulesFromDirectory)
    // process
    assert.exists(mod.execShellCommand)
    // timers
    assert.exists(mod.intervalAtEveryUTC)
    // tests
    assert.exists(mod.createFakeServer)
    // types
    assert.exists(mod.Queue)
  });
});
