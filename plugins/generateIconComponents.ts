import type { ComponentResolverObject } from 'unplugin-vue-components/types'
import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export const iconComponentsDir = '~vic/'
const iconFileDir = 'src/assets/icons/'
// 短横线转成大写驼峰
function toPascalCase(filename: string) {
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

function generateIcon(file: string) {
    return `<template><i class="i-icon" :style="style" /></template>
<script setup>
import icon from '@/assets/icons/${file}'
const style = {
    '--icon': 'url("' + icon + '")'
}
</script>
`
}
export function generateIconComponents(): Plugin[] {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons')
    let iconComponents: Record<string, string> = {}
    const generateComponents = () => {
        const files = fs.readdirSync(iconsDir)
        iconComponents = {}
        files.forEach((file) => {
            const componentName = `I${path.basename(toPascalCase(file), '.svg')}`
            const fileContent = generateIcon(file)
            iconComponents[`${iconComponentsDir + componentName}.vue`] = fileContent
        })
    }

    let hasResolved = false
    return [{
        // 这个插件用于解决 vite 首次引入启动时虚拟依赖报错问题
        name: 'vite-ignore-icon-components-at-first',
        enforce: 'pre',
        apply: 'serve',
        resolveId(id) {
            if (hasResolved) {
                return
            }

            if (fs.existsSync('node_modules/.vite/deps')) {
                hasResolved = true
                return
            }

            if (id.startsWith(iconComponentsDir)) {
                return 'src/App.vue'
            }
        }
    }, {
        name: 'vite-generate-icon-components',
        enforce: 'post',
        resolveId(id) {
            if (id.startsWith(iconComponentsDir)) {
                return id
            }
        },
        load(id) {
            if (id.startsWith(iconComponentsDir)) {
                // id: '~vic/IDeleteRound'
                return iconComponents[id]
            }
        },
        hotUpdate(options) {
            if (options.file.includes(iconFileDir)) {
                generateComponents()
                options.server.moduleGraph.invalidateAll()
            }
        },
        buildStart() {
            generateComponents()
        }
    }]
}
export function IconResolver(): ComponentResolverObject {
    return {
        type: 'component',
        resolve(name) {
            if (/^I[A-Z].*/.test(name)) {
                return `${iconComponentsDir}${name}.vue`
            }
        }
    }
}
