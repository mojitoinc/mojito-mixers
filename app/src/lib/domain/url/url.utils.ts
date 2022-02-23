export function getUrlWithoutParams() {
  if (!process.browser) return "/";

  const { href, search } = window.location;

  return search ? href.replace(search, "") : href;
}

export function urlToPathnameWhenPossible(url: string): string {
  if (!process.browser) return "/";

  const { origin } = window.location;

  return (url.startsWith(origin) ? url.replace(origin, "") : url) || "/";
}

export function isUrlPathname(url: string): boolean {
  return !url.startsWith("http");
}

export function getUrlWithSearchParams(url: string): string {
  if (!process.browser) return url;

  return `${ url }${ window.location.search }`;
}