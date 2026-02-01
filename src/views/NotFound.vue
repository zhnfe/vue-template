<template>
    <div class="font-mono">
        <h1 class="text-center text-5xl mt-[40vh]"><pre>404 Not Found</pre></h1>
        <p class="flex justify-center items-end mt-4 text-2xl">
            <span>Will go to the home page in</span>
            <span class="text-3xl">&nbsp;{{ count }}&nbsp;</span>
            <span>seconds</span>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const count = ref(5)
let timer: number
onMounted(() => {
    timer = setInterval(() => {
        if (count.value === 0) {
            router.replace('/')
        }
        else {
            count.value--
        }
    }, 1000)
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>
