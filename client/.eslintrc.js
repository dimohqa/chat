module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  plugins: [
    'react-hooks',
  ],
  extends: ['airbnb-typescript'],
  rules: {
    'max-len': ['warn', { code: 120 }],
    'no-param-reassign': [2, {
      props: false,
    }],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
