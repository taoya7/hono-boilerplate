import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import YAML from 'yaml'
import { defu } from 'defu'
import { Config, configSchema } from './schema'

const NODE_ENV = process.env.NODE_ENV as string
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
let rootDir = ''
// @ts-expect-error
let config: Config = {}
if (process.env.NODE_ENV === 'development') {
  rootDir = path.resolve(__dirname, '..', '..', 'src')
}
else {
  rootDir = path.resolve(__dirname, '..', 'dist')
}
export async function setupConfig() {
  const envMap = {
    development: 'dev',
    production: 'prod',
    test: 'test',
  }
  const defaultFileContent = fs.readFileSync(path.join(rootDir, 'resources/application.yml'), 'utf8')
  const defaultConfig = YAML.parse(defaultFileContent)
  const configFile = path.join(rootDir, 'resources', `application-${envMap[NODE_ENV]}.yml`)
  const fileExists = fs.existsSync(configFile)
  if (fileExists) {
    const envFileContent = fs.readFileSync(configFile, 'utf8')
    const envConfig = YAML.parse(envFileContent)
    const mergedConfig = defu(envConfig, defaultConfig)
    const e = configSchema.safeParse(mergedConfig)
    if (e.success) {
      config = e.data
    }
    else {
      console.log('配置错误', e.error)
      process.exit(0)
    }
    config.__dirname = rootDir
    config.isProduction = NODE_ENV === 'production'
  }
  return config
}
setupConfig()
export { config }
export * from './schema'
