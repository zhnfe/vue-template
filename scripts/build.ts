import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'

function npx(command: string) {
    return new Promise<void>((resolve) => {
        const task = spawn(`npx ${command}`, {
            shell: true,
            stdio: 'inherit'
        })
        task.on('close', (code) => {
            if (code === 0) {
                resolve()
            }
        })
    })
}
npx('run-p lint type-check')
    .then(() => npx('vite build'))
    .then(() => writeFile('dist/version', Date.now().toString()))
    .catch((reason) => {
        console.error(reason)
        process.exit(1)
    })
