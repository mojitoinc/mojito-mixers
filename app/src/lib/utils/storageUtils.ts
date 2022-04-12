// import { WebStorage } from "proxy-storage";

import { isLocalhost } from "../domain/url/url.utils";

// TODO: Replace all this with a good storage library.
// See https://gist.github.com/Danziger/aba818586535972971a63a1352419900
// See https://www.npmjs.com/package/@swyg/memo (next version has configurable storages: https://github.com/helloswyg/memo/pull/3)

const DEBUG = false;

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

function getCookieSecurityParams(params: CookieParams = {}) {
  const {
    domain = "",
    secure,
    crossDomain = false,
    httpOnly,
  } = params;

  const securityParams = [];

  if (secure || (secure === undefined && !isLocalhost())) {
    securityParams.push("secure");
  }

  if (crossDomain) {
    const domainParam = domain || (process.browser ? location.host : "");

    if (domainParam) securityParams.push(`domain=${ domainParam }`);
  }

  if (httpOnly) {
    securityParams.push("httponly");
  }

  const securityParamsStr = securityParams.filter(Boolean).join("; ");

  return securityParamsStr ? ` ${ securityParamsStr };` : "";
}

function setCookie(
  key: string,
  value: any,
  params: CookieParams = {},
) {
  if (typeof document === "undefined") return;

  const serializedValue = params.noParse ? value : encodeURIComponent(JSON.stringify(value));
  const expirationDate =  params.expirationDate || (params.expirationDate === false ? undefined : new Date(Date.now() + 30 * 24 * 3600000)); // 30 days default expiration
  const cookieParams = [
    expirationDate ? `expires=${ expirationDate.toUTCString() }` : undefined,
    `path=${ params.path || "/" }`,
    getCookieSecurityParams(params),
  ].filter(Boolean).join("; ");

  console.log(`Setting cookie ${ key }=<VALUE>; ${ cookieParams }`);

  if (DEBUG || isLocalhost()) {
    document.cookie = `${ key }=${ serializedValue }; ${ cookieParams }`;
  }
}

function parseCookie<T = any>(cookieValue: string): T {
  return JSON.parse(decodeURIComponent(cookieValue)) as T;
}

function getCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};

  return Object.fromEntries(
    document.cookie.split("; ").map((cookie) => {
      return cookie.split("=");
    })
  );
}

function getCookie<T = any>(name: string, options: CookieOptions = {}): T | string | undefined {
  const rawCookie = getCookies()[name] || undefined;

  if (rawCookie === undefined) return undefined;
  if (options.noParse) return rawCookie;

  return parseCookie(rawCookie);
}

export type ProxyStorageType = "localStorage" | "cookieStorage" | "sessionStorage" | "memoryStorage";

export class ProxyStorage {
  type: ProxyStorageType;

  constructor (type: ProxyStorageType) {
    this.type = type;
  }

  /**
   * Stores a value given a key name.
   * The options parameter is used only with instances of cookieStorage.
   */
  setItem(key: string, value: any, options?: CookieParams) {
    setCookie(key, value, options);
  }

  /**
   * Retrieves a value by its key name.
   * If noParse is true then the value retrieved is not parsed with JSON.parse.
   */
  getItem(key: string, options: CookieOptions = {}) {
    return getCookie(key, options)
  }

  /**
   * Deletes an item from the storage.
   * The options parameter is used only with instances of cookieStorage.
   */
  removeItem(key: string, options?: any) {
    // TODO: Implement.
  }

  /**
   * Removes all items from the storage instance.
   */
  clear() {
    // TODO: Implement.
  }

  /**
   * Gets the number of items stored in the instance.
   */
  get length(): number {
    return Object.keys(getCookies()).length;
  }
};

export const cookieStorage = new ProxyStorage("cookieStorage");
