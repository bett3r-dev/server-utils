import fs from 'fs';
import Async from 'crocks/Async';

export const promiseToAsync = (promise: Promise<any>) => Async(( reject, resolve ) => promise.then( resolve, reject ));

export const ensureAsync = ( possibleAsync?: any ) =>
  possibleAsync?.type && possibleAsync.type() === 'Async' ? possibleAsync :
    (( !possibleAsync || !possibleAsync.then ) ? Async.of(possibleAsync) : promiseToAsync( possibleAsync ));

export const readFile = Async.fromNode(fs.readFile as any);
