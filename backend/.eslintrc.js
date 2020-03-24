module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'no-undef': 'off',
    '@typescript-eslint/camelcase': 'off',
    'camelcase': 'off'
  }
}
