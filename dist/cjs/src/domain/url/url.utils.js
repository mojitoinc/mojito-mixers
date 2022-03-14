'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function isLocalhost() {
    if (!process.browser)
        return false;
    return window.location.hostname === "localhost";
}

exports.getUrlWithSearchParams = getUrlWithSearchParams;
exports.getUrlWithoutParams = getUrlWithoutParams;
exports.isLocalhost = isLocalhost;
exports.isUrlPathname = isUrlPathname;
exports.urlToPathnameWhenPossible = urlToPathnameWhenPossible;
//# sourceMappingURL=url.utils.js.map
