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
    'no-debugger': 'error', // 允许debugger
    // '@typescript-eslint/no-explicit-any': 'error', // 不允许在ts中使用any     官网：https://typescript-eslint.io/rules/
    // 'no-unused-vars': 'error' // vue中也提供了相应配置：https://eslint.vuejs.org/ 	【eslint-plugin-vue】
    'simple-import-sort/imports':'error', // 组件导入按照顺序排列（第三方库放在上面，其他组件有序放在下面）   可以在awesome-eslint中查看更多插件
  },
  "plugins": ["simple-import-sort"],
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
        'src/**/*.vue'
      ],
      rules: {
        'vue/multi-word-component-names': 0,
      },
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
