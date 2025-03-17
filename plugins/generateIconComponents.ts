import fs from 'fs'
import path from 'path'
import type { ComponentResolverObject } from 'unplugin-vue-components/types'
import type { Plugin } from 'vite'

export const iconComponentsDir = 'virtual:icon-components/'
const iconFileDir = 'src/assets/icons/'
// 短横线转成大写驼峰
const toPascalCase = (filename: string) => {
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

export function generateIconComponents(): Plugin {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons')
    let iconComponents: Record<string, string> = {}
    const generateComponents = () => {
        const files = fs.readdirSync(iconsDir)
        iconComponents = {}
        files.forEach(file => {
            const componentName = 'I' + path.basename(toPascalCase(file), '.svg')
            const content = encodeURIComponent(fs.readFileSync(path.join(iconsDir, file), 'utf-8'))
            const fileContent = `<template><i class="i-icon" style="--icon: url('data:image/svg+xml,${content}')" /></template>`
            iconComponents[iconComponentsDir + componentName + '.vue'] = fileContent
        })
    }

    return {
        name: 'vite-generate-icon-components',
        enforce: 'pre',
        resolveId(id) {
            if (id.startsWith(iconComponentsDir)) {
                return id
            }
            return null
        },
        load(id) {
            if (id.startsWith(iconComponentsDir)) {
                console.log('loadId: ', id)
                // key: 'virtual:icon-components/IDeleteRound.vue'
                return iconComponents[id]
            }
            return null
        },
        hotUpdate(options) {
            if (options.file.includes(iconFileDir)) {
                console.log('****modules:', options.modules)
                generateComponents()
                // options.server.
            }
        },
        buildStart() {
            generateComponents()
        }
    }
}
export function IconResolver(): ComponentResolverObject {
    return {
        type: 'component',
        resolve(name) {
            if (/^I[A-Z].*?/.test(name)) {
                return `${iconComponentsDir}${name}.vue`
            }
        }
    }
}
