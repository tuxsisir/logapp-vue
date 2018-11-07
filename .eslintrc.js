module.exports = {
  root: true,
  parserOptions: { parser: 'babel-eslint' },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  rules: {
    'new-cap': ['error', { 'properties': false }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'never',
        'component': 'never'
      },
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }]
  },
  /*
  Reference for overriding the indent off on .vue files only as eslint-vue-plugin has its own indent rules.
  https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md#important-note
  */
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    },
  ],
  // add your custom rules here
  globals: {}
}
