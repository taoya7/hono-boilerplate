import path from 'node:path'
import fsExtra from 'fs-extra'
import ansis from 'ansis'

const __dirname = path.join(path.dirname(new URL(import.meta.url).pathname), '..')

// 将assets目录移动到dist
function main() {
  const targetDir = path.join(__dirname, 'src/assets')
  const distDir = path.join(__dirname, 'dist/assets')
  fsExtra.copySync(targetDir, distDir)
  console.log(`${ansis.green`[scripts/build]`} build success`)
}
main()
