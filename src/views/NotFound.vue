<template>
    <div class="font-mono">
        <h1 class="text-center text-5xl mt-[40vh]"><pre>404 Not Found</pre></h1>
        <p class="flex justify-center items-end mt-4 text-2xl">
            <span>Will go to the home page in</span>
            <pre class="text-3xl"> {{ count }} </pre>
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
