import antfu from '@antfu/eslint-config'

export default antfu({
  nextjs: true,
  ignores: [
    './.source/**',
    './docs/**',
    './scripts/**',
  ],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
