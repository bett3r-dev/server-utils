export * from './modules/hashing';
export * from './modules/http';
export * from './modules/modules';
export * from './modules/process';
export * from './modules/timers';
export * from './modules/tests';
export * from './modules/types';
declare type hashing = typeof import('./modules/hashing');
declare type http = typeof import('./modules/http');
declare type modules = typeof import('./modules/modules');
declare type process = typeof import('./modules/process');
declare type timers = typeof import('./modules/timers');
declare type types = typeof import('./modules/types');
declare type tests = typeof import('./modules/tests');
export declare interface ServerUtils extends hashing, http, modules, process, timers, tests, types {
}
export declare const Transducers: {
    FilterReducer: <TInput, TResult>(predicate: (curr: TInput, acc: TResult) => boolean, reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    MapReducer: <TInput_1, TResult_1>(fn: (curr: TInput_1, acc: TResult_1) => TResult_1 | import("simple-transducers").Reduced<TResult_1>, reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    ReduceReducer: <TInput_2, TResult_2>(fn: (accumulated: TResult_2 | import("simple-transducers").Reduced<TResult_2>, current: TInput_2) => TResult_2 | import("simple-transducers").Reduced<TResult_2>, initial: TResult_2 | import("simple-transducers").Reduced<TResult_2>, reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    WhileReducer: <TInput_3, TResult_3>(predicate: (curr: TInput_3, acc: TResult_3) => boolean, reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    StandardReducer: (description: any) => import("simple-transducers").Transducer;
    defaultReducerProps: (reducer: any) => {
        '@@transducer/init': (...args: any[]) => any;
        '@@transducer/result': (arg: any) => any;
    };
    Reduced: <TResult_4>(value: any) => import("simple-transducers").Reduced<TResult_4>;
    isReduced: <TResult_5>(result: TResult_5 | import("simple-transducers").Reduced<TResult_5>) => boolean;
    map: <TInput_4, TResult_6>(fn: (curr: TInput_4, acc: TResult_6) => TResult_6 | import("simple-transducers").Reduced<TResult_6>) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    flatMap: <TInput_5, TResult_7>(fn: (curr: TInput_5) => TResult_7 | import("simple-transducers").Reduced<TResult_7>) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    filter: <TInput_6, TResult_8>(predicate: (curr: TInput_6, acc: TResult_8) => boolean) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    reduce: <TInput_7, TResult_9>(fn: (accumulated: TResult_9 | import("simple-transducers").Reduced<TResult_9>, current: TInput_7) => TResult_9 | import("simple-transducers").Reduced<TResult_9>, initial: TResult_9 | import("simple-transducers").Reduced<TResult_9>) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    dedupe: <T>(allValues?: boolean, lastValue?: T) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    take: (count?: number) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    skip: (count?: number) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    takeUntil: <TInput_8, TResult_10>(predicate: (curr: TInput_8, acc: TResult_10) => boolean) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    skipWhile: <TInput_9, TResult_11>(predicate: (curr: TInput_9, acc: TResult_11) => boolean, state?: boolean) => (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer;
    transduce: <TInput_10, TResult_12>(transformer: (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer, reducer: import("simple-transducers").Transducer, initialValue: import("simple-transducers").CollectionResult<TResult_12>, collection: import("simple-transducers").CollectionInput<TInput_10>) => import("simple-transducers").CollectionResult<TResult_12>;
    into: {
        <TInput_11, TResult_13>(to: import("simple-transducers").CollectionResult<TResult_13>, transformer: (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer): import("simple-transducers").PartialSeq<TInput_11, TResult_13>;
        <TInput_12, TResult_14>(to: import("simple-transducers").CollectionResult<TResult_14>, transformer: (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer, collection: import("simple-transducers").CollectionInput<TInput_12>): import("simple-transducers").CollectionResult<TResult_14>;
    };
    seq: {
        <TInput_13, TResult_15>(transformer: (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer): import("simple-transducers").PartialInto<TInput_13, TResult_15>;
        <TInput_14, TResult_16>(transformer: (reducer: import("simple-transducers").Transducer) => import("simple-transducers").Transducer, collection?: import("simple-transducers").CollectionInput<TInput_14>): import("simple-transducers").CollectionResult<TResult_16>;
    };
};
export * from 'rambda';
export * from 'bett3r-utils';
declare type transducers = typeof import('simple-transducers').default;
declare type rambda = typeof import('rambda');
declare type utils = typeof import('bett3r-utils');
export declare interface Utils extends rambda, utils, ServerUtils {
    Transducers: transducers;
}
//# sourceMappingURL=index.d.ts.map