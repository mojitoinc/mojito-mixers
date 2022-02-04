// Non-Breaking Space (&nbsp):
export const NBSP = '\u00A0';

/**
 * Capitalize first letter and enforce a dot at the end.
 */
export function formatSentence(str: string) {
  return `${ str.charAt(0).toUpperCase() }${ str.slice(1) }.`.replace(/\.\.$/, ".");
}
