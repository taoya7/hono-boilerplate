import 'dotenv/config'
import { configSchema } from './schema'

export * from './schema'
const envs = process.env
export const config = configSchema.parse(envs)
