import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!**/*.test.ts'],
  format: ['esm'], // 输出格式配置，这里设置为 ESM（ECMAScript 模块）
  dts: false, // 是否生成 TypeScript 声明文件 (.d.ts)，这里设置为不生成
  splitting: false, // 是否启用代码拆分，用于代码分割，这里禁用
  sourcemap: false, // 是否生成源代码映射（sourcemap），用于调试，这里设置为不生成
  clean: true, // 在构建前清理输出目录，确保构建输出是干净的
  // platform: 'node', // 明确指定为 Node.js 平台
  // target: 'node16', // 或者您的目标 Node.js 版本
  // noExternal: ['*'], // 将所有依赖打包进输出文件
  // // 如果需要，可以明确包含 Node.js 内置模块
  // external: ['fs', 'path', 'os'],
})
