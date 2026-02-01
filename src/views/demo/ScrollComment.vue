<template>
    <div class="w-100 mt-80 m-auto">
        <div class="mb-5 flex gap-x-3">
            <n-input
                v-model:value="newComment"
                type="text"
                @keydown.enter="handleAdd"
            />
            <n-button @click="handleAdd">添加</n-button>
        </div>
        <div class="bg-red-400 overflow-hidden cursor-pointer">
            <div
                ref="box"
                class="transition-all duration-300"
                @click="handleBoxClick"
                @transitionend="handleTransitionEnd"
            >
                <div
                    v-for="item, index in data.concat(data.slice(0, 3))"
                    :key="index"
                    class="py-2"
                >
                    <div class="p-3 border rounded-lg">
                        <div class="line-clamp-2 ">{{ index % data.length }}. {{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from 'vue'

const data = reactive([
    { text: '非常满意，质量不错。' },
    { text: '用了几天才来评价，整体表现超出预期，值得入手。操作简单，老人也能轻松使用，说明书写得详细清楚。lasjdfkjas ldjfl jsaldjfljs aldjfljasl dfjlksajdlk' },
    { text: '性价比高，功能齐全。' },
    { text: '包装完好，送货速度快。' },
    { text: '客服服务态度非常好，回复及时，耐心解答各种疑问，购物体验非常愉快，推荐大家购买。' },
    { text: '产品外观漂亮，使用起来也很顺手，整体体验很好。物流速度快，包装严实，没有破损，值得信赖。' },
    { text: '操作简单，老人也能轻松使用，说明书写得详细清楚。' },
    { text: '体验感很好，运行流畅，没有出现卡顿或者闪退情况。服务态度佳，购物体验愉快。' },
    { text: '包装完好，送货速度快，服务态度佳，购物体验愉快。' },
    { text: '价格合理，活动期间购买更划算，性价比非常高，值得推荐！服务态度佳，购物体验愉快。' }
])

const newComment = ref('')
let i = 0
let stop = false
const box = useTemplateRef('box')

const handleAdd = () => {
    if (newComment.value && box.value) {
        data.unshift({ text: newComment.value })
        newComment.value = ''
        box.value.style.transform = `translateY(0px)`
        i = 0
        stop = true
        setTimeout(() => {
            stop = false
        }, 5000)
    }
}
const handleBoxClick = () => {
    if (stop) {
        return
    }
    stop = true
    setTimeout(() => {
        stop = false
    }, 5000)
}
const handleTransitionEnd = () => {
    // console.log('end')
}

const getItems = () => Array.from(box.value?.children || []) as HTMLDivElement[]

const layout = () => {
    if (!box.value) {
        return
    }
    const next = i + 1
    const els = getItems()
    const height = els.slice(next, next + 3).reduce((sum, cur) => sum + cur.getBoundingClientRect().height, 0)
    const translateY = els.slice(0, next).reduce((sum, cur) => sum + cur.getBoundingClientRect().height, 0)
    box.value.style.transform = `translateY(-${translateY}px)`
    box.value.style.transition = ''
    box.value.style.height = `${height}px`
    i++
}
onMounted(() => {
    if (!box.value) {
        return
    }
    const els = getItems()
    const height = els.slice(0, 3).reduce((sum, cur) => sum + cur.getBoundingClientRect().height, 0)
    box.value.style.height = `${height}px`
    setInterval(() => {
        if (stop || !box.value) {
            return
        }
        if (i === data.length) {
            box.value.style.transition = 'none'
            box.value.style.transform = `translateY(0px)`
            i = 0
        }
        layout()
    }, 1000)
})
</script>
