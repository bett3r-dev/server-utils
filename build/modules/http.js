"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAsync = exports.processFetchResponse = void 0;
const crocks_1 = require("crocks");
const node_fetch_1 = __importDefault(require("node-fetch"));
const safe_1 = __importDefault(require("crocks/Maybe/safe"));
const bett3r_utils_1 = require("bett3r-utils");
const rambda_1 = require("rambda");
const parseResponseBody = (response, method) => response.json()
    .then(body => Promise[method](rambda_1.assoc('body', body, response)));
const processFetchResponse = (response) => bett3r_utils_1.promiseToAsync(safe_1.default(crocks_1.isTrue, response.ok)
    .either(() => parseResponseBody(response, 'reject'), () => parseResponseBody(response, 'resolve')));
exports.processFetchResponse = processFetchResponse;
const fetchAsync = (url, options) => bett3r_utils_1.promiseToAsync(node_fetch_1.default(url, {
    method: 'get',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    ...options,
}));
exports.fetchAsync = fetchAsync;
//# sourceMappingURL=http.js.map