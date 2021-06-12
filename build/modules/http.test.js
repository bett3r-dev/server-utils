"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const chai_1 = require("chai");
const tests_1 = require("./tests");
describe('http', function () {
    describe('fetchAsync', function () {
        it('works like fetch but retuns an async', done => {
            const server = tests_1.createFakeServer();
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .fork(done, (response) => {
                chai_1.assert.equal(response.status, 200);
                server.close(() => {
                    done();
                });
            });
        });
        it('sets the body in the response in the prop responseBody', done => {
            const server = tests_1.createFakeServer({ body: { name: 'tomas' } });
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .fork(done, (response) => {
                let body = '';
                response.body.on('data', chunk => {
                    body += chunk;
                });
                response.body.on('end', () => {
                    chai_1.assert.equal(body, JSON.stringify({ name: 'tomas' }));
                    server.close(() => {
                        done();
                    });
                });
            });
        });
    });
    describe('processFetchJsonResponse', function () {
        it('process the response from a fetch request when request is ok', done => {
            const server = tests_1.createFakeServer({ body: { name: 'tomas' } });
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .chain(http_1.processFetchResponse)
                .fork(done, (response) => {
                chai_1.assert.deepEqual(response.body, { name: 'tomas' });
                server.close(() => {
                    done();
                });
            });
        });
        it('process the response from a fetch request when request is not ok and body is object', done => {
            const server = tests_1.createFakeServer({ code: 400, body: { name: 'tomas' } });
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .chain(http_1.processFetchResponse)
                .fork((response) => {
                chai_1.assert.deepEqual(response.body, { name: 'tomas' });
                server.close(() => {
                    done();
                });
            }, done);
        });
        it('process the response from a fetch request when request is not ok and body is text', done => {
            const server = tests_1.createFakeServer({ code: 400, body: "Error" });
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .chain(http_1.processFetchResponse)
                .fork((response) => {
                chai_1.assert.equal(response.body, "Error");
                server.close(() => {
                    done();
                });
            }, done);
        });
        it('process the response from a fetch request when request is not ok and body is number', done => {
            const server = tests_1.createFakeServer({ code: 400, body: 234 });
            http_1.fetchAsync(`http://localhost:${server.address().port}`)
                .chain(http_1.processFetchResponse)
                .fork((response) => {
                chai_1.assert.equal(response.body, 234);
                server.close(() => {
                    done();
                });
            }, done);
        });
    });
});
//# sourceMappingURL=http.test.js.map