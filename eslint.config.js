import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  stylistic: {
    indent: 2, // 缩进
    quotes: 'single', // 引号
  },
  rules: {
    'no-use-before-define': 'off', // 允许定义之前使用
    'no-prototype-builtins': 'off', // 允许使用原型方法
    'unused-imports/no-unused-imports': 2, // 防止未使用导入的规则
  },
}, {
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'ts/ban-types': 'off',
    'ts/method-signature-style': 'off',
    'unused-imports/no-unused-vars': 'off',
    'array-callback-return': 'off',
    'ts/ban-ts-comment': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/no-require-imports': 'off',
    'ts/no-var-requires': 'off',
  },
})
