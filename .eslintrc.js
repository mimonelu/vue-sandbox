module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // キャメルケース以外の記法を許可する（ API のレスポンスをそのまま利用するため）
    '@typescript-eslint/camelcase': 0,
    // any 型を許可する（最終的には不許可にしたい）
    '@typescript-eslint/no-explicit-any': 0,
    // `[]` の中に空白を許可する
    'array-bracket-spacing': 0,
    // 行末のセミコロンを許可しない
    'comma-dangle': 0,
    // オブジェクトを代入しない `new CLASS()` を許可する
    'no-new': 0,
    // `++` の前などにスペースを付けることを許可する
    'space-unary-ops': 0
  }
}
