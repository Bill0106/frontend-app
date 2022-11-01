module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'array-bracket-spacing': ['error', 'never'],
    'no-unused-vars': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: false
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-extra-semi': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true,
      overrides: {
        arrow: { before: true, after: true }
      }
    }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
}
