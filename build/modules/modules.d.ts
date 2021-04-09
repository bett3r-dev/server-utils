export interface LoadModuleOptions {
    whiteList?: string[];
    blackList?: string[];
    onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>;
}
export interface ComponentModule {
    init?: () => Promise<any>;
    destroy?: () => Promise<any>;
    hookHandler?: () => {};
    [key: string]: any;
}
export interface LoadModulesFromDirectoryOptions {
    options?: LoadModuleOptions;
    recursive?: boolean;
}
export declare function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, { options, recursive }: LoadModulesFromDirectoryOptions): Promise<Record<string, T>>;
//# sourceMappingURL=modules.d.ts.map