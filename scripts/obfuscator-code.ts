import fs from 'node:fs'
import path from 'node:path'
import JavaScriptObfuscator from 'javascript-obfuscator'
import ansis from 'ansis'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// 定义混淆函数，处理单个文件
function obfuscateFile(filePath: string) {
  // 读取文件内容
  const code = fs.readFileSync(filePath, 'utf8')

  // 混淆代码
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    disableConsoleOutput: true,
  }).getObfuscatedCode()

  // 写入混淆后的代码到同一个文件
  fs.writeFileSync(filePath, obfuscatedCode)
  console.log(`${ansis.green`File obfuscated: `}${filePath}`)
}

// 遍历 dist 目录中的所有 JS 文件
function obfuscateDirectory(directory: string) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)
    const stat = fs.statSync(fullPath)

    if (stat.isFile() && fullPath.endsWith('.js')) {
      obfuscateFile(fullPath)
    }
    else if (stat.isDirectory()) {
      // 如果是目录，递归处理
      obfuscateDirectory(fullPath)
    }
  }
}

// 调用函数，开始混淆 dist 目录中的 JS 文件
obfuscateDirectory(path.join(__dirname, '../dist'))
