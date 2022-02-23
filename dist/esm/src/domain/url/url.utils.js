function getUrlWithoutParams() {
    if (!process.browser)
        return "/";
    const { href, search } = window.location;
    return search ? href.replace(search, "") : href;
}
function urlToPathnameWhenPossible(url) {
    if (!process.browser)
        return "/";
    const { origin } = window.location;
    return (url.startsWith(origin) ? url.replace(origin, "") : url) || "/";
}
function isUrlPathname(url) {
    return !url.startsWith("http");
}
function getUrlWithSearchParams(url) {
    if (!process.browser)
        return url;
    return `${url}${window.location.search}`;
}

export { getUrlWithSearchParams, getUrlWithoutParams, isUrlPathname, urlToPathnameWhenPossible };
//# sourceMappingURL=url.utils.js.map
