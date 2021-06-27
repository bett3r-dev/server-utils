import { assert } from 'chai';
import {intervalAtEveryUTC} from './timers';
import sinon from "sinon";

describe( 'timers', function() {
  describe( 'intervalAtEveryUTC', function() {
    it( 'starts an interval each 24h from 00h', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      const setIntervalSpy = sinon.spy( fakeTimers, 'setInterval' );
      intervalAtEveryUTC();
      assert.equal( new Date( setTimeoutSpy.args[0][1] as number).getUTCHours(), 0 );
      fakeTimers.next();
      assert.equal( setIntervalSpy.args[0][1], 86400000 );
      fakeTimers.restore();
    });
    it( 'starts an interval at specific hour', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime:'3' });
      assert.equal( new Date( setTimeoutSpy.args[0][1] as number).getUTCHours(), 3 );
      fakeTimers.restore();
    });
    it( 'starts an interval at specific minutes', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime: '00:34' });
      assert.equal( new Date( setTimeoutSpy.args[0][1] as number).getMinutes(), 34 );
      fakeTimers.restore();
    });
    it( 'starts an interval at specific seconds', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime: '02:33:34' });
      assert.equal( new Date( setTimeoutSpy.args[0][1] as number).getSeconds(), 34 );
      fakeTimers.restore();
    });
    it( 'creates an interval of the specified value', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setIntervalSpy = sinon.spy( fakeTimers, 'setInterval' );
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime:'3', interval: 60000 });
      fakeTimers.tick( new Date( setTimeoutSpy.args[0][1] as number).valueOf());
      assert.equal( setIntervalSpy.args[0][1], 60000 );
      fakeTimers.restore();
    });
    it( 'creates an interval starting now', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setIntervalSpy = sinon.spy( fakeTimers, 'setInterval' );
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime:false, interval: 60000 });
      assert.isTrue( setTimeoutSpy.notCalled );
      assert.equal( setIntervalSpy.args[0][1], 60000 );
      fakeTimers.restore();
    });
    it( 'starts the interval in the next starting time possible', () => {
      const fakeTimers = sinon.useFakeTimers( new Date( '2020/01/01 06:01:00' ));
      const setIntervalSpy = sinon.spy( fakeTimers, 'setInterval' );
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      intervalAtEveryUTC({ startTime:'06:00', interval: 120000 });
      assert.equal( setTimeoutSpy.args[0][1], 60000 );
      fakeTimers.next();
      assert.equal( setIntervalSpy.args[0][1], 120000 );
      fakeTimers.restore();
    });
    it( 'stops an interval by ending the returning stream', () => {
      const fakeTimers = sinon.useFakeTimers();
      const setIntervalSpy = sinon.spy( fakeTimers, 'setInterval' );
      const setTimeoutSpy = sinon.spy( fakeTimers, 'setTimeout' );
      const s = intervalAtEveryUTC({ startTime:'3', interval: 1000 });
      const mapSpy = sinon.spy();
      s.map( mapSpy );
      fakeTimers.tick( new Date( setTimeoutSpy.args[0][1] as number).valueOf());
      assert.equal( setIntervalSpy.args[0][1], 1000 );
      fakeTimers.next();
      fakeTimers.next();
      s.end( true );
      fakeTimers.next();
      fakeTimers.next();
      fakeTimers.restore();
      assert.equal( mapSpy.callCount, 3 );
    });
  });
});
