// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        Components({
            resolvers: [ElementPlusResolver()],
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
    }
})
