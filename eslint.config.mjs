import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['.source/**', 'reference/**'],
  nextjs: true,
})
