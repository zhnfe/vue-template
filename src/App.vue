<template>
    <router-view />
</template>

<script lang="ts" setup>
import { message } from './utils'

let version = ''
let isFirst = true
if (import.meta.env.PROD) {
    const timer = setInterval(async () => {
        const res = await fetch(`${import.meta.env.BASE_URL}/version`, {
            cache: 'no-store'
        }).then(res => res.text())
        if (isFirst) {
            version = res
            isFirst = false
            return
        }
        console.log(res, version, isFirst)
        if (res !== version) {
            message.info('发现新版本，请刷新页面', { duration: 0 })
            clearInterval(timer)
        }
    }, 5000)
}
</script>
