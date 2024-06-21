import { execSync } from 'node:child_process'

let gitHash = ''
let gitDate = new Date()
if (!gitHash) {
  try {
    gitHash = execSync('git rev-parse HEAD').toString().trim().slice(0, 8)
    gitDate = new Date(execSync('git log -1 --format=%cd').toString().trim())
  }
  catch {
    gitHash = 'unknown'
  }
}

export { gitHash, gitDate }
