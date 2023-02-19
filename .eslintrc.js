module.exports = {
  root: true,
  plugins: ['license-header'],
  extends: ['@inrupt/eslint-config-react', 'next', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'license-header/header': [1, './resources/license-header.js'],
    'jsx-a11y/label-has-associated-control': 0,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
