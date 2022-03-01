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
/**
 * Calculate how much time is left since <start> ms out of <total> ms and formats that as MM:SS.
 */
function formatTimeLeft(start, total) {
    const elapsedMs = Date.now() - start;
    const timeLeftMs = Math.max(total - elapsedMs, 0);
    const timeLeftMins = (timeLeftMs / 60000) | 0;
    const timeLeftSeconds = ((timeLeftMs % 60000) / 1000) | 0;
    return `${`00${timeLeftMins}`.slice(-2)}:${`00${timeLeftSeconds}`.slice(-2)}`;
}
/**
 * Returns a formatted tax rate with none or two decimal places.
 */
function formatTaxRate(taxRate) {
    return `${(Math.round(taxRate * 100) / 100).toFixed(2).replace(/\.00$/, "")} %`;
}

exports.NBSP = NBSP;
exports.formatSentence = formatSentence;
exports.formatTaxRate = formatTaxRate;
exports.formatTimeLeft = formatTimeLeft;
exports.parseSentences = parseSentences;
//# sourceMappingURL=formatUtils.js.map
