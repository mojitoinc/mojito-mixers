/* eslint react/prop-types: 0 */
/* eslint quote-props: [2, "consistent-as-needed"] */

const TEMPORARILY_DISABLED = 0;

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

    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",

    // Use the plugin above instead.
    // See https://nextjs.org/docs/basic-features/eslint#recommended-plugin-ruleset
    // "next/core-web-vitals",
  ],

  plugins: [
    "unused-imports",
  ],

  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"], },

    "import/resolver": {
      typescript: {
        // Always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`:
        alwaysTryTypes: true,
      },
    },
  },

  // exhaustive props
  // rules-of-hook
  // How to find out if rules enabled.

  // See Nubble to fix individual rules (doesn't seem to work properly right now, thought):
  // https://github.com/IanVS/eslint-nibble
  // ./node_modules/.bin/eslint --no-eslintrc --fix --rule 'semi: [2]'

  rules: {
    // eslint:

    "quotes": [TEMPORARILY_DISABLED, "double"],
    "quote-props": [2, "as-needed"],
    "max-len": [2, { code: 160, ignorePattern: "^(import|export) .*", ignoreRegExpLiterals: true, ignoreStrings: true }],
    "no-multiple-empty-lines": [2, { max: 2, maxBOF: 0, maxEOF: 0 }],
    "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    "template-curly-spacing": [TEMPORARILY_DISABLED, "always"],
    "no-bitwise": ["error", { int32Hint: true }],
    "comma-dangle": TEMPORARILY_DISABLED,
    "semi": TEMPORARILY_DISABLED,
    "no-console": TEMPORARILY_DISABLED,
    "object-curly-newline": [2, { multiline: true, consistent: true }],
    "array-element-newline": [2, "consistent"],
    "arrow-body-style": 0,
    "no-prototype-builtins": 0,
    "no-multi-assign": 0,
    "no-nested-ternary": TEMPORARILY_DISABLED,
    "no-mixed-operators": [2, { allowSamePrecedence: true }],
    "function-paren-newline": [2, "consistent"],
    "no-param-reassign": [2, { props: true, ignorePropertyModificationsForRegex: ["Acc$"] }],
    "operator-linebreak": [2, "after", { overrides: { "?": "before", ":": "before" } }],


    // eslint-plugin-import:

    "import/extensions": 0,
    "import/no-unresolved": 2,
    "import/prefer-default-export": 0,
    "import/no-cycle": TEMPORARILY_DISABLED,
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.ts", "**/*.test.tsx"] }],

    // eslint-plugin-react:

    "react/jsx-props-no-spreading": TEMPORARILY_DISABLED,
    "react/prop-types": TEMPORARILY_DISABLED,
    "react/no-unused-prop-types": TEMPORARILY_DISABLED,

    "react/state-in-constructor": 0,
    "react/no-unescaped-entities": 0, // TODO: Use ’
    "react/require-default-props": 0,
    "react/jsx-one-expression-per-line": 0,

    "react/jsx-closing-bracket-location": [TEMPORARILY_DISABLED, "after-props"],

    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],

    "react/jsx-filename-extension": [1, {
      allow: "as-needed",
      extensions: [".tsx"],
    }],

    "react/jsx-curly-spacing": [TEMPORARILY_DISABLED, {
      when: "always",
      attributes: { allowMultiline: false },
      children: true,
      spacing: { objectLiterals: "never" },
    }],


    // eslint-plugin-react-hooks:

    "react-hooks/exhaustive-deps": 2,


    // eslint-plugin-jsx-a11y:
    "jsx-a11y/anchor-is-valid": TEMPORARILY_DISABLED,


    // typescript-eslint:

    "@typescript-eslint/no-explicit-any": TEMPORARILY_DISABLED,


    // next/recommended:


    // unused-imports:

    "unused-imports/no-unused-imports": "warn",


    // OLD:
    // "func-style": ["off", "declaration"],
    // "no-prototype-builtins": "off",
    // @TODO/temp Non-critical stuff we should clean up, but hiding for now to clear clutter in order to see more
    // important issues:
    // "@typescript-eslint/explicit-module-boundary-types": "off",
  },

  ignorePatterns: [
    "dist/*", "generated.tsx", "graphqlGenerated.tsx",
  ],
};
