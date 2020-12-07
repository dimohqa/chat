module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-typescript'],
  rules: {
    'import/prefer-default-export': 'off',
  },
};
