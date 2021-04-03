export interface Queue<T> {
    length: number;
    pop: () => T;
    push: (value: T) => Queue<T>;
    has: (value: T) => boolean;
    ap: (data: any) => any[];
    map: <V>(fn: (param: T) => V) => Queue<V>;
    fold: <V>(fn: (param: T) => V) => V[];
    concat: (other: Queue<T>) => Queue<T>;
    inspect: () => string;
}
export declare const Queue: <T>(init?: any) => Queue<T>;
//# sourceMappingURL=types.d.ts.map