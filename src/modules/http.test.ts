import {FetchResponse, fetchAsync, processFetchResponse} from './http';

import { AddressInfo } from 'net';
import { Response } from 'node-fetch';
import { assert } from 'chai';
import {createFakeServer} from './tests';

describe( 'http', function() {
  describe( 'fetchAsync', function() {
    it( 'works like fetch but retuns an async', done => {
      const server = createFakeServer();
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .fork( done, (response: FetchResponse) => {
          assert.equal( response.status, 200 );
          server.close(() => {
            done();
          });
        });
    });
    it( 'sets the body in the response in the prop responseBody', done => {
      const server = createFakeServer({body:{ name:'tomas' }});
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .fork( done, (response: Response) => {
          let body = '';
          response.body.on('data', chunk => {
            body+= chunk
          })
          response.body.on('end', () => {
            assert.equal( body, JSON.stringify({ name:'tomas' }));
            server.close(() => {
              done();
            });
          })
        });
    });
  });
  describe('processFetchJsonResponse', function() {
    it('process the response from a fetch request when request is ok', done => {
      const server = createFakeServer({body:{ name:'tomas' }});
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .chain(processFetchResponse)
        .fork( done, (response: FetchResponse) => {
          assert.deepEqual( response.body, { name:'tomas' });
          server.close(() => {
            done();
          });
        });
    });
    it('process the response from a fetch request when request is not ok and body is object', done => {
      const server = createFakeServer({code:400, body:{ name:'tomas' }});
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .chain(processFetchResponse)
        .fork((response: FetchResponse) => {
          assert.deepEqual( response.body, { name:'tomas' });
          server.close(() => {
            done();
          });
        }, done);
    });
    it('process the response from a fetch request when request is not ok and body is text', done => {
      const server = createFakeServer({code:400, body:"Error"});
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .chain(processFetchResponse)
        .fork((response: FetchResponse<string>) => {
          assert.equal( response.body, "Error");
          server.close(() => {
            done();
          });
        }, done);
    });
    it('process the response from a fetch request when request is not ok and body is number', done => {
      const server = createFakeServer({code:400, body:234});
      fetchAsync( `http://localhost:${(server.address() as AddressInfo).port}` )
        .chain(processFetchResponse)
        .fork((response: FetchResponse<number>) => {
          assert.equal( response.body, 234);
          server.close(() => {
            done();
          });
        }, done);
    });
  });
});
