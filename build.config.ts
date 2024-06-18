import { join } from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/main.ts',
      format: 'cjs',
    },
  ],
  declaration: true,
  outDir: 'dist',
  clean: true,
  alias: {
    '@': join(__dirname, 'src'),
  },
})
