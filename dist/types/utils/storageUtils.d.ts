interface CookieOptions {
    noParse?: boolean;
}
interface CookieParams extends CookieOptions {
    domain?: string;
    path?: string;
    secure?: boolean;
    crossDomain?: boolean;
    httpOnly?: boolean;
    expirationDate?: Date | false;
}
export declare type ProxyStorageType = "localStorage" | "cookieStorage" | "sessionStorage" | "memoryStorage";
export declare class ProxyStorage {
    type: ProxyStorageType;
    constructor(type: ProxyStorageType);
    /**
     * Stores a value given a key name.
     * The options parameter is used only with instances of cookieStorage.
     */
    setItem(key: string, value: any, options?: CookieParams): void;
    /**
     * Retrieves a value by its key name.
     * If noParse is true then the value retrieved is not parsed with JSON.parse.
     */
    getItem(key: string, options?: CookieOptions): any;
    /**
     * Deletes an item from the storage.
     * The options parameter is used only with instances of cookieStorage.
     */
    removeItem(key: string, options?: CookieParams): boolean;
    /**
     * Removes all items from the storage instance.
     */
    clear(options?: CookieParams): void;
    /**
     * Gets the number of items stored in the instance.
     */
    get length(): number;
}
export declare const cookieStorage: ProxyStorage;
export {};
