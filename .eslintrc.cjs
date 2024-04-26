/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 开发环境不能使用console
    'no-debugger': 'off', // 允许debugger
    '@typescript-eslint/no-explicit-any': 'error' // 不允许在ts中使用any     官网：https://typescript-eslint.io/rules/
    // 'no-unused-vars': 'error' // vue中也提供了相应配置：https://eslint.vuejs.org/ 	【eslint-plugin-vue】
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
