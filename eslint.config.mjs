import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  nextjs: true,
  rules: {
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
    'next/no-img-element': 'off',
  },
})
