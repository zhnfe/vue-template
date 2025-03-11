// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        tailwindcss(),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: false })],
            dts: false
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    build: {
        target: 'esnext'
    },
    base: process.env.NODE_ENV === 'development' ? '/' : '/vue-template'
})
