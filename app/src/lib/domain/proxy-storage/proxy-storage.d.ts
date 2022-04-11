
declare module "proxy-storage" {
  export type WebStorageType = "localStorage" | "cookieStorage" | "sessionStorage" | "memoryStorage";

  export class WebStorage {
    constructor (type: WebStorageType);

    /**
     * Stores a value given a key name.
     * The options parameter is used only with instances of cookieStorage.
     */
    setItem: (key: string, value: any, options?: any) => void;

    /**
     * Retrieves a value by its key name.
     * If noParse is true then the value retrieved is not parsed with JSON.parse.
     */
    getItem: (key: string, noParse?: boolean) => any;

    /**
     * Deletes an item from the storage.
     * The options parameter is used only with instances of cookieStorage.
     */
    removeItem: (key: string, options?: any) => void;

    /**
     * Removes all items from the storage instance.
     */
    clear: () => void;

    /**
     * Gets the number of items stored in the instance.
     */
    length: number;
  };
}

