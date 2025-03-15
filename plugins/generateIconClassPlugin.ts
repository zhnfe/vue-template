import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

export default function iconsCssPlugin(): Plugin {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons')
    const cssFilePath = path.join(process.cwd(), 'src/assets/styles/icons.css')
    let watcher: fs.FSWatcher | null = null
    const generateCss = () => {
        fs.readdir(iconsDir, (err, files) => {
            if (err) {
                console.error('读取目录出错:', err)
                return
            }

            let cssContent = ''

            files.forEach(file => {
                if (path.extname(file) === '.svg') {
                    const fileName = path.basename(file, '.svg')
                    const className = `.i-${fileName}`
                    const url = `../icons/${file}`

                    cssContent += `${className} {\n    --icon: url(${url});\n}\n` // 4个空格缩进
                }
            })

            fs.mkdir(path.dirname(cssFilePath), { recursive: true }, err => {
                if (err) {
                    console.error('创建目录出错:', err)
                    return
                }

                fs.writeFile(cssFilePath, cssContent, err => {
                    if (err) {
                        console.error('写入 CSS 文件出错:', err)
                        return
                    }
                    console.log(`已成功生成 CSS 文件: ${cssFilePath}`)
                })
            })
        })
    }

    return {
        name: 'generateIconClassPlugin',
        buildStart() {
            generateCss()

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
                        generateCss()
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

export function iconComponentsPlugin(): Plugin {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons')
    const componentsPath = path.join(process.cwd(), 'src/components/icons')
    if (!fs.existsSync(componentsPath)) {
        fs.mkdirSync(componentsPath, { recursive: true })
    }
    let watcher: fs.FSWatcher | null = null
    const generateComponents = () => {
        fs.readdir(iconsDir, (err, files) => {
            if (err) {
                console.error('读取目录出错:', err)
                return
            }
            files.forEach(file => {
                const componentName = 'I' + path.basename(file.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''), '.svg')
                const content = encodeURIComponent(fs.readFileSync(path.join(iconsDir, file), 'utf-8'))
                const fileContent = `<template><i class="i-icon" style="--icon: url('data:image/svg+xml,${content}')" /></template>`
                fs.writeFileSync(path.join(componentsPath, componentName + '.vue'), fileContent)
            })
        })
    }

    return {
        name: 'generateIconComponentsPlugin',
        buildStart() {
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
