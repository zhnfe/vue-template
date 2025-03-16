// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import { iconComponentsPlugin } from './plugins/generateIconClassPlugin'
export default defineConfig({
    plugins: [
        // generateIconClassPlugin(),
        iconComponentsPlugin(),
        vue(),
        vueJsx(),
        tailwindcss(),
        Components({
            resolvers: [
                NaiveUiResolver()
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
                    vue: ['vue', 'vue-router', 'pinia'],
                    naive: ['naive-ui']
                }
            }
        }
    },
    base: process.env.NODE_ENV === 'development' ? '/' : '/vue-template'
})
