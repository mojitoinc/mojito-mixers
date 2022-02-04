// Non-Breaking Space (&nbsp):
var NBSP = '\u00A0';
/**
 * Capitalize first letter and enforce a dot at the end.
 */
function formatSentence(str) {
    return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1), ".").replace(/\.\.$/, ".");
}

export { NBSP, formatSentence };
//# sourceMappingURL=formatUtils.js.map
