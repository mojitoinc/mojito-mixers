'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Non-Breaking Space (&nbsp):
const NBSP = '\u00A0';
/**
 * Capitalize first letter and enforce a dot at the end.
 */
function formatSentence(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}.`.replace(/\.\.$/, ".");
}

exports.NBSP = NBSP;
exports.formatSentence = formatSentence;
//# sourceMappingURL=formatUtils.js.map
