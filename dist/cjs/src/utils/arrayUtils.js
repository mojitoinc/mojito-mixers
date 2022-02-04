'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function distinctBy(array, key) {
    var map = new Map(array.map(function (item) { return [item[key], item]; }));
    return Array.from(map.values());
}

exports.distinctBy = distinctBy;
//# sourceMappingURL=arrayUtils.js.map
