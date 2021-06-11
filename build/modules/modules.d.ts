export interface LoadModuleOptions {
    whiteList?: string[];
    blackList?: string[];
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
    whiteList?: RegExp[];
    blackList?: RegExp[];
}): true | undefined;
export declare const formatRegExpForFileLists: (options: LoadModuleOptions) => {
    whiteList: RegExp[];
    blackList: RegExp[];
};
export declare function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>>;
//# sourceMappingURL=modules.d.ts.map