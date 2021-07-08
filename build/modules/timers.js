"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalAtEveryUTC = void 0;
const flyd_1 = __importDefault(require("@bett3r-dev/flyd"));
function intervalAtEveryUTC(params) {
    params = params || {};
    let hour, minute, second, intervalStart, hit;
    const { startTime = '00:00:00', interval = 86400000 } = params;
    const now = startTime === false;
    const tick = flyd_1.default.stream();
    const currentDate = new Date().valueOf();
    let intervalHandler;
    let timeoutHandler;
    const executeInterval = () => setInterval(() => {
        tick(new Date(new Date().valueOf() + interval));
    }, interval);
    if (!now) {
        [hour = 0, minute = 0, second = 0] = startTime.split(':');
        intervalStart = (Number(hour) * 3600000) + (Number(minute) * 60000) + (Number(second) * 1000);
        hit = currentDate - (currentDate % 86400000) + intervalStart;
        while (hit < currentDate)
            hit += interval;
        timeoutHandler = setTimeout(() => {
            tick(new Date(new Date().valueOf() + interval));
            intervalHandler = executeInterval();
        }, hit - currentDate);
    }
    else {
        intervalHandler = executeInterval();
    }
    //close
    tick.end.map(() => {
        clearInterval(intervalHandler);
        clearTimeout(timeoutHandler);
    });
    return tick;
}
exports.intervalAtEveryUTC = intervalAtEveryUTC;
//# sourceMappingURL=timers.js.map