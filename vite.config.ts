// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import { makeIconPlugin, makeIconResolver } from './plugins/makeIcon'
export default defineConfig({
    define: {
        __VUE_OPTIONS_API__: false
    },
    plugins: [
        makeIconPlugin(),
        vue(),
        vueJsx(),
        tailwindcss(),
        Components({
            include: [],
            resolvers: [
                NaiveUiResolver(),
                makeIconResolver({
                    customPath: 'src/assets/icons',
                    modulePath: 'node_modules/@material-symbols/svg-400/outlined',
                    typeFilePath: '',
                    prefix: 'Icon'
                })
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
        target: 'esnext'
    },
    base: process.env.NODE_ENV === 'development' ? '/' : '/vue-template',
    server: {
        allowedHosts: true
    }
})
