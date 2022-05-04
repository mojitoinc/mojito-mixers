module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    // "no-empty": "off",
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/ban-types": "off",
    "unused-imports/no-unused-imports": "warn",
    "react-hooks/exhaustive-deps": "error",
    "func-style": ["off", "declaration"],
    "no-prototype-builtins": "off",

    // @TODO/temp Non-critical stuff we should clean up, but hiding for now to clear clutter in order to see
    // more important issues:
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  ignorePatterns: ["dist/*"],
};
