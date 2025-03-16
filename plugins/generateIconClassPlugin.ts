import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

// 短横线转成大写驼峰
const toPascalCase = (filename: string) => {
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

export function iconComponentsPlugin(): Plugin {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons')
    const componentsPath = path.join(process.cwd(), 'src/components/icons')
    if (!fs.existsSync(componentsPath)) {
        fs.mkdirSync(componentsPath, { recursive: true })
    }
    let watcher: fs.FSWatcher | null = null
    const generateComponents = async () => {
        const files = fs.readdirSync(iconsDir)
        const icons = files.map(item => 'I' + path.basename(toPascalCase(item), '.svg'))
        fs.readdir(componentsPath, (err, components) => {
            if (err) {
                console.error('读取组件目录出错:', err)
                return
            }
            components.forEach(componentName => {
                if (!icons.includes(path.basename(componentName, '.vue'))) {
                    fs.unlinkSync(path.join(componentsPath, componentName))
                }
            })
        })
        files.forEach((file, i) => {
            const componentName = icons[i]
            const content = encodeURIComponent(fs.readFileSync(path.join(iconsDir, file), 'utf-8'))
            const fileContent = `<template><i class="i-icon" style="--icon: url('data:image/svg+xml,${content}')" /></template>`
            fs.writeFileSync(path.join(componentsPath, componentName + '.vue'), fileContent)
        })
    }

    return {
        name: 'generateIconComponentsPlugin',
        enforce: 'pre',
        async config() {
            generateComponents()

            let isGenerating = false
            watcher = fs.watch(iconsDir, (eventType, filename) => {
                if (eventType === 'change') {
                    return
                }
                if (filename && path.extname(filename) === '.svg') {
                    if (isGenerating) {
                        return // 如果正在生成，则忽略后续事件
                    }
                    isGenerating = true
                    setTimeout(() => {
                        console.log(`文件 ${filename} 发生 ${eventType} 事件`)
                        generateComponents()
                        isGenerating = false
                    }, 100) // 添加 100 毫秒延迟
                }
            })
        },
        closeBundle() {
            if (watcher) {
                watcher.close()
                watcher = null
            }
        }
    }
}

// 大驼峰转成短横线命
// const toKebabCase = (filename: string) => {
//     return filename.split(/(?=[A-Z])/).map(item => item.toLowerCase()).join('-')
// }
