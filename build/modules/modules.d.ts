export interface LoadModuleOptions {
    whiteList?: (string | RegExp)[];
    blackList?: (string | RegExp)[];
    recursive?: boolean;
    onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>;
    formatName?: (name: string) => string;
}
export interface ComponentModule {
    init?: () => Promise<any>;
    destroy?: () => Promise<any>;
    hookHandler?: () => {};
    [key: string]: any;
}
export declare function toCamelCase(str: string): string;
export declare function filterFilename(filename: string, module: string, { whiteList, blackList }: {
    whiteList?: any[];
    blackList?: any[];
}): true | undefined;
export declare function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options?: LoadModuleOptions): Promise<Record<string, T>>;
//# sourceMappingURL=modules.d.ts.map