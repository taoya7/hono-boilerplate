import path from 'node:path'
import fsExtra from 'fs-extra'
import ansis from 'ansis'

const __dirname = path.join(path.dirname(new URL(import.meta.url).pathname), '..')

// 将assets目录移动到dist
function main() {
  const targetDirs = [
    {
      path: path.join(__dirname, 'src/assets'),
      out: 'dist/assets',
    },
    {
      path: path.join(__dirname, 'src/resources'),
      out: 'dist/resources',
    },
  ]
  for (let i = 0; i < targetDirs.length; i++) {
    const targetDir = targetDirs[i]
    const distDir = path.join(__dirname, targetDir.out)
    fsExtra.copySync(targetDir.path, distDir)
    console.log(`${ansis.green`[scripts/build]`} ${targetDir.out} success`)
  }
}
main()
