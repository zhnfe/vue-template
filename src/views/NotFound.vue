<template>
    <h1 class="text-center text-5xl mt-[40vh]"><pre>404  Not Found</pre></h1>
    <p class="text-center mt-6 text-2xl">Will go to the home page in {{ count }} seconds</p>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const count = ref(5)
let timer: number
onMounted(() => {
    timer = setInterval(() => {
        count.value--
        if (count.value === 0) {
            router.replace('/')
        }
    }, 1000)
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>
