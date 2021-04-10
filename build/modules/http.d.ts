import { RequestInit, Response } from 'node-fetch';
import Async from 'crocks/Async';
export interface FetchResponse<T = Record<string, any>> extends Omit<Response, 'body'> {
    body: T;
}
export declare const processFetchResponse: (response: Response) => Async<Error, Response>;
export declare const fetchAsync: (url: string, options?: RequestInit | undefined) => Async<Error, Response>;
//# sourceMappingURL=http.d.ts.map