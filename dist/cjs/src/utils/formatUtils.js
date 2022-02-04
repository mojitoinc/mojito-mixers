'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Non-Breaking Space (&nbsp):
var NBSP = '\u00A0';
/**
 * Capitalize first letter and enforce a dot at the end.
 */
function formatSentence(str) {
    return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1), ".").replace(/\.\.$/, ".");
}

exports.NBSP = NBSP;
exports.formatSentence = formatSentence;
//# sourceMappingURL=formatUtils.js.map
