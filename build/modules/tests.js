"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeServer = void 0;
const rambda_1 = require("rambda");
const http_1 = __importDefault(require("http"));
/**
 * Creates a test http server. It will automatically listen on a random port
  * @param payloadToReturn Payload to return to all possible requests or an array of pairs with path and payload
 * @returns {http.Server}
 */
const createFakeServer = (payloadToReturn) => http_1.default.createServer((req, res) => {
    rambda_1.map((value, key) => res.setHeader(key, value), req.headers);
    let route = {};
    if (Array.isArray(payloadToReturn))
        route = payloadToReturn.find(r => new RegExp(r.route).test(req.url));
    else
        route = payloadToReturn;
    const body = route && route.body;
    res.statusCode = route && route.code || 200;
    res.end(JSON.stringify(body));
}).listen();
exports.createFakeServer = createFakeServer;
//# sourceMappingURL=tests.js.map