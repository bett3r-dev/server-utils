export interface LoadModuleOptions {
    whiteList?: string[];
    blackList?: string[];
    recursive?: boolean;
    onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>;
}
export interface ComponentModule {
    init?: () => Promise<any>;
    destroy?: () => Promise<any>;
    hookHandler?: () => {};
    [key: string]: any;
}
export declare function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>>;
//# sourceMappingURL=modules.d.ts.map