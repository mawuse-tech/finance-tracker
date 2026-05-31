import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const isRender = process.env.RENDER === 'true'
const serverEntry = '.output/server/index.mjs'

if (!isRender) {
  process.exit(0)
}

if (existsSync(serverEntry)) {
  console.log(`Render build fallback skipped: ${serverEntry} already exists.`)
  process.exit(0)
}

console.log('Render build fallback: generating Nuxt production output...')

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npmCommand, ['run', 'build'], {
  stdio: 'inherit',
  shell: false,
})

process.exit(result.status ?? 1)
