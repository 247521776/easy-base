export interface Options {
    logger?: any;
    loadFiles?: string[];
    rootPath: string;
}

export type Constructor<T = any> = new (...args: any[]) => T;
