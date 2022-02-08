'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function distinctBy(array, key) {
    const map = new Map(array.map(item => [item[key], item]));
    return Array.from(map.values());
}

exports.distinctBy = distinctBy;
//# sourceMappingURL=arrayUtils.js.map
