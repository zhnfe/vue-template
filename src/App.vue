<template>
    <router-view />
</template>

<script lang="ts" setup>
import { message } from './utils'

if (import.meta.env.PROD) {
    let version = ''
    const timer = setInterval(async () => {
        const res = await fetch(`${import.meta.env.BASE_URL}/version`, {
            cache: 'no-store'
        }).then(res => res.text())
        if (!version) {
            version = res
            return
        }
        if (res !== version) {
            message.info('发现新版本，请刷新页面', { duration: 0 })
            clearInterval(timer)
        }
    }, 30 * 1000)
}
</script>
