"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const bett3r_utils_1 = require("bett3r-utils");
const Queue = (init) => {
    let values = (init && bett3r_utils_1.ensureArray(init)) || [];
    return {
        get length() { return values.length; },
        pop: () => !!values.length && values.pop(),
        push: value => { values.unshift(value); return exports.Queue(values); },
        has: value => values.includes(value),
        ap: data => values.map(x => x(data)),
        map: f => exports.Queue(values.map(f)),
        fold: f => values.map(f),
        concat: other => exports.Queue(other.concat(values)),
        inspect: () => `Queue(${values})`
    };
};
exports.Queue = Queue;
//# sourceMappingURL=types.js.map