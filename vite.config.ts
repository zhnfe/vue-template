// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import { generateIconComponents, IconResolver } from './plugins/generateIconComponents'
export default defineConfig({
    define: {
        __VUE_OPTIONS_API__: false
    },
    plugins: [
        // generateIconClass(),
        generateIconComponents(),
        vue(),
        vueJsx(),
        tailwindcss(),
        Components({
            globs: ['src/components/icons/*.vue'],
            resolvers: [
                NaiveUiResolver(),
                IconResolver()
            ],
            dts: 'src/types/components.d.ts'
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'pinia', 'es-toolkit'],
                    naive: ['naive-ui']
                }
            }
        }
    },
    base: process.env.NODE_ENV === 'development' ? '/' : '/vue-template',
    server: {
        allowedHosts: true
    }
})
