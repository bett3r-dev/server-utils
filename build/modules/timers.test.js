"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const timers_1 = require("./timers");
describe('timers', function () {
    describe('intervalAtEveryUTC', function () {
        it('starts an interval each 24h from 00h', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            const setIntervalSpy = sinon_1.default.spy(fakeTimers, 'setInterval');
            timers_1.intervalAtEveryUTC();
            chai_1.assert.equal(new Date(setTimeoutSpy.args[0][1]).getUTCHours(), 0);
            fakeTimers.next();
            chai_1.assert.equal(setIntervalSpy.args[0][1], 86400000);
            fakeTimers.restore();
        });
        it('starts an interval at specific hour', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: '3' });
            chai_1.assert.equal(new Date(setTimeoutSpy.args[0][1]).getUTCHours(), 3);
            fakeTimers.restore();
        });
        it('starts an interval at specific minutes', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: '00:34' });
            chai_1.assert.equal(new Date(setTimeoutSpy.args[0][1]).getMinutes(), 34);
            fakeTimers.restore();
        });
        it('starts an interval at specific seconds', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: '02:33:34' });
            chai_1.assert.equal(new Date(setTimeoutSpy.args[0][1]).getSeconds(), 34);
            fakeTimers.restore();
        });
        it('creates an interval of the specified value', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setIntervalSpy = sinon_1.default.spy(fakeTimers, 'setInterval');
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: '3', interval: 60000 });
            fakeTimers.tick(new Date(setTimeoutSpy.args[0][1]).valueOf());
            chai_1.assert.equal(setIntervalSpy.args[0][1], 60000);
            fakeTimers.restore();
        });
        it('creates an interval starting now', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setIntervalSpy = sinon_1.default.spy(fakeTimers, 'setInterval');
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: false, interval: 60000 });
            chai_1.assert.isTrue(setTimeoutSpy.notCalled);
            chai_1.assert.equal(setIntervalSpy.args[0][1], 60000);
            fakeTimers.restore();
        });
        it('starts the interval in the next starting time possible', () => {
            const fakeTimers = sinon_1.default.useFakeTimers(new Date('2020/01/01 06:01:00'));
            const setIntervalSpy = sinon_1.default.spy(fakeTimers, 'setInterval');
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            timers_1.intervalAtEveryUTC({ startTime: '06:00', interval: 120000 });
            chai_1.assert.equal(setTimeoutSpy.args[0][1], 60000);
            fakeTimers.next();
            chai_1.assert.equal(setIntervalSpy.args[0][1], 120000);
            fakeTimers.restore();
        });
        it('stops an interval by ending the returning stream', () => {
            const fakeTimers = sinon_1.default.useFakeTimers();
            const setIntervalSpy = sinon_1.default.spy(fakeTimers, 'setInterval');
            const setTimeoutSpy = sinon_1.default.spy(fakeTimers, 'setTimeout');
            const s = timers_1.intervalAtEveryUTC({ startTime: '3', interval: 1000 });
            const mapSpy = sinon_1.default.spy();
            s.map(mapSpy);
            fakeTimers.tick(new Date(setTimeoutSpy.args[0][1]).valueOf());
            chai_1.assert.equal(setIntervalSpy.args[0][1], 1000);
            fakeTimers.next();
            fakeTimers.next();
            s.end(true);
            fakeTimers.next();
            fakeTimers.next();
            fakeTimers.restore();
            chai_1.assert.equal(mapSpy.callCount, 3);
        });
    });
});
//# sourceMappingURL=timers.test.js.map