import { copyFileSync } from 'node:fs'
import fsExtra from 'fs-extra'
import path from 'node:path'

const __dirname = path.join(path.dirname(new URL(import.meta.url).pathname), '..')

// 将assets目录移动到dist
function main(){
    let targetDir = path.join(__dirname, 'src/assets')
    let distDir = path.join(__dirname, 'dist/assets')
    fsExtra.copySync(targetDir, distDir)
}
main()