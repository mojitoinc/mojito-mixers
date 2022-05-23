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
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },

    "import/resolver": {
      typescript: {
        // Always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`:
        alwaysTryTypes: true,
      },
    },
  },

  // To fix individual rules, see Nubble (doesn't seem to work properly right now, thought):
  // https://github.com/IanVS/eslint-nibble

  // Otherwise, you can do it with this command by writing the rule and params inline:
  // ./node_modules/.bin/eslint --no-eslintrc --fix --rule 'semi: [2]'

  rules: {
    // eslint:

    "array-element-newline": [2, "consistent"],
    "arrow-body-style": 0,
    "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    "comma-dangle": 2,
    "default-param-last": 0,
    "function-paren-newline": [2, "consistent"],
    "max-len": [2, { code: 160, ignorePattern: "^(import|export) .*", ignoreRegExpLiterals: true, ignoreStrings: true }],
    "no-bitwise": ["error", { int32Hint: true }],
    "no-console": TEMPORARILY_DISABLED,
    "no-mixed-operators": [2, { allowSamePrecedence: true }],
    "no-multi-assign": 0,
    "no-multiple-empty-lines": [2, { max: 2, maxBOF: 0, maxEOF: 0 }],
    "no-nested-ternary": 0,
    "no-param-reassign": [2, { props: true, ignorePropertyModificationsForRegex: ["Acc$"] }],
    "no-prototype-builtins": 0,
    "no-shadow": 0,
    "object-curly-newline": [2, { multiline: true, consistent: true }],
    "operator-linebreak": [2, "after", { overrides: { "?": "before", ":": "before" } }],
    "quote-props": [2, "as-needed"],
    "quotes": [2, "double"],
    "semi": 2,
    "template-curly-spacing": [2, "always"],


    // eslint-plugin-import:

    "import/extensions": 0,
    "import/no-cycle": TEMPORARILY_DISABLED,
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.ts", "**/*.test.tsx", "jest.setup.ts", "jest.config.js"] }],
    "import/no-unresolved": 2,
    "import/prefer-default-export": 0,


    // eslint-plugin-react:

    "react/jsx-one-expression-per-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-unescaped-entities": 2, // For ' use ’
    "react/require-default-props": 0,
    "react/state-in-constructor": 0,

    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/jsx-closing-bracket-location": [2, "after-props"],
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
    "react/no-unused-prop-types": 2,
    "react/prop-types": 2,

    "react/jsx-curly-spacing": [2, {
      when: "always",
      attributes: { allowMultiline: false },
      children: true,
      spacing: { objectLiterals: "never" },
    }],

    "react/jsx-filename-extension": [2, {
      allow: "as-needed",
      extensions: [".tsx"],
    }],


    // eslint-plugin-react-hooks:

    "react-hooks/exhaustive-deps": 2,


    // eslint-plugin-jsx-a11y:

    "jsx-a11y/anchor-is-valid": 0,


    // typescript-eslint:

    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": TEMPORARILY_DISABLED,
    "@typescript-eslint/no-shadow": 2,


    // next/recommended:


    // unused-imports:

    "unused-imports/no-unused-imports": "warn",
  },

  ignorePatterns: [
    "dist/*", "generated.tsx", "graphqlGenerated.tsx",
  ],
};
