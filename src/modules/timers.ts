import Stream from '@tomasruizr/flyd';

export function intervalAtEveryUTC( params?: { startTime?: string|boolean; interval?: number; } ) {
  params = params || {};
  let hour , minute , second, intervalStart, hit;
  const { startTime = '00:00:00', interval = 86400000 } = params;
  const now = startTime === false;
  const tick = Stream.stream();
  const currentDate = new Date().valueOf();
  let intervalHandler : NodeJS.Timeout;
  let timeoutHandler : NodeJS.Timeout;
  const executeInterval = () =>
    setInterval(() => {
      tick( new Date( new Date().valueOf() + interval ));
    }, interval );

  if ( !now ) {
    [ hour = 0, minute = 0, second = 0 ] = (startTime as string).split( ':' );
    intervalStart = ( Number( hour ) * 3600000 ) + ( Number( minute ) * 60000 ) + ( Number( second ) * 1000 );
    hit = currentDate - ( currentDate % 86400000 ) + intervalStart;
    while ( hit < currentDate ) hit += interval;
    timeoutHandler = setTimeout(()=>{
      tick( new Date( new Date().valueOf() + interval ));
      intervalHandler = executeInterval();
    }, hit - currentDate );
  } else {
    intervalHandler = executeInterval();
  }
  //close
  tick.end.map(() => {
    clearInterval( intervalHandler );
    clearTimeout( timeoutHandler );
  });
  return tick;
}
