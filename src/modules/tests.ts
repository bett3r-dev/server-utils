import http from 'http';
import {map} from 'rambda';
// import sinon from 'sinon';

export interface fakeResponse {
  code?: number
  route?: string
  body?: any
}

export const loggerMock = {
  // silly: sinon.spy(),
  // debug: sinon.spy(),
  // log: sinon.spy(),
  // info: sinon.spy(),
  // warn: sinon.spy(),
  // error: sinon.spy(),
}

export const hookMock = {
  // onHook: sinon.spy(),
  // onHookAsync: sinon.spy(),
  // dispatchHook: sinon.spy(),
  // dispatchHookAsync: sinon.spy(),
}

/**
 * Creates a test http server. It will automatically listen on a random port
  * @param payloadToReturn Payload to return to all possible requests or an array of pairs with path and payload
 * @returns {http.Server}
 */
export const createFakeServer = ( payloadToReturn?: fakeResponse[] | fakeResponse ): http.Server =>
  http.createServer(( req, res ) => {
    map(( value: any, key ) => res.setHeader( key, value ), req.headers );
    let route: fakeResponse | undefined = {};
    if ( Array.isArray( payloadToReturn ))
      route = payloadToReturn.find( r => new RegExp( r.route as string ).test( req.url as string ));
    else
      route = payloadToReturn;
    const body = route && route.body;
    res.statusCode = route && route.code || 200;
    res.end( JSON.stringify( body ));
  }).listen();
