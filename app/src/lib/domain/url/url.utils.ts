import { IS_SERVER } from "../build/build.constants";

export function getUrlWithoutParams(): string {
  if (IS_SERVER) return "/";

  const { href, search } = window.location;

  return search ? href.replace(search, "") : href;
}

export function urlToPathnameWhenPossible(url: string): string {
  if (IS_SERVER) return "/";

  const { origin } = window.location;

  return (url.startsWith(origin) ? url.replace(origin, "") : url) || "/";
}

export function getPathnameWithParams(): string {
  return `${ window.location.pathname }${ window.location.search }`;
}

export function isUrlPathname(url: string): boolean {
  return !url.startsWith("http");
}

export function getUrlWithSearchParams(url: string): string {
  if (IS_SERVER) return url;

  return `${ url }${ window.location.search }`;
}

export function isLocalhost() {
  if (IS_SERVER) return false;

  return window.location.hostname === "localhost";
}

export function isLocalhostOrStaging() {
  if (IS_SERVER) return false;

  return isLocalhost() || /\.staging\./.test(window.location.origin.replace(/[/\-.]/g, "."));
}
