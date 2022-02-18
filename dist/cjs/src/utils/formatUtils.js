'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Non-Breaking Space (&nbsp):
const NBSP = '\u00A0';
/**
 * Capitalize first letter and enforce a dot at the end.
 */
function formatSentence(str) {
    const trimmedStr = str.trim();
    return `${trimmedStr.charAt(0).toUpperCase()}${trimmedStr.slice(1)}.`.replace(/\.\.$/, ".");
}
/**
 * Split a single string with line-breaks into an array of sentences.
 */
function parseSentences(str) {
    return str.split(/\n/).map(formatSentence);
}

exports.NBSP = NBSP;
exports.formatSentence = formatSentence;
exports.parseSentences = parseSentences;
//# sourceMappingURL=formatUtils.js.map
