import http from 'http';
export interface fakeResponse {
    code?: number;
    route?: string;
    body?: any;
}
/**
 * Creates a test http server. It will automatically listen on a random port
  * @param payloadToReturn Payload to return to all possible requests or an array of pairs with path and payload
 * @returns {http.Server}
 */
export declare const createFakeServer: (payloadToReturn?: fakeResponse[] | fakeResponse) => http.Server;
//# sourceMappingURL=tests.d.ts.map