import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/**/*.ts'], // 入口文件配置，此配置将包含 src 目录下所有的 .ts 文件
  format: ['esm'], // 输出格式配置，这里设置为 ESM（ECMAScript 模块）
  dts: false, // 是否生成 TypeScript 声明文件 (.d.ts)，这里设置为不生成
  splitting: false, // 是否启用代码拆分，用于代码分割，这里禁用
  sourcemap: false, // 是否生成源代码映射（sourcemap），用于调试，这里设置为不生成
  clean: true, // 在构建前清理输出目录，确保构建输出是干净的
})
