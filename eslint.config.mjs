import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['.source/**'],
  nextjs: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
