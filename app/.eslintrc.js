module.exports = {
  root: true,

  extends: [
    "airbnb",
    "airbnb/hooks",

    // Airbnb includes:
    // - eslint
    // - eslint-plugin-import
    // - eslint-plugin-react
    // - eslint-plugin-react-hooks
    // - eslint-plugin-jsx-a11y

    "plugin:@typescript-eslint/recommended",

    "plugin:@next/next/recommended",

    // Use the plugin above instead.
    // See https://nextjs.org/docs/basic-features/eslint#recommended-plugin-ruleset
    // "next/core-web-vitals",
  ],

  plugins: [
    "unused-imports",
  ],

  // exhaustive props
  // rules-of-hook
  // How to find out if rules enabled.

  // eslint --no-eslintrc --fix --rule 'semi: [2]'

  rules: {
    // eslint:
    "quotes": ["error", "double"],

    // eslint-plugin-import:

    // eslint-plugin-react:

    // eslint-plugin-react-hooks:
    "react-hooks/exhaustive-deps": "error",

    // eslint-plugin-jsx-a11y:

    // typescript-eslint:
    "@typescript-eslint/no-explicit-any": "error",

    // next/recommended:

    // unused-imports:
    "unused-imports/no-unused-imports": "warn",


    // OLD:
    // "func-style": ["off", "declaration"],
    // "no-prototype-builtins": "off",
    // @TODO/temp Non-critical stuff we should clean up, but hiding for now to clear clutter in order to see more important issues:
    // "@typescript-eslint/explicit-module-boundary-types": "off",
  },

  ignorePatterns: [
    "dist/*",
  ],
};
