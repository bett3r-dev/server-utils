export declare const Queue: (init?: any) => {
    readonly length: number;
    pop: () => any;
    push: (value: any) => any;
    has: (value: any) => boolean;
    ap: (data: any) => any[];
    map: (f: any) => any;
    fold: (f: any) => unknown[];
    concat: (other: any) => any;
    inspect: () => string;
};
//# sourceMappingURL=types.d.ts.map