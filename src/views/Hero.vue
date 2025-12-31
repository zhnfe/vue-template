<template>
    <div class="max-w-7xl mx-auto pt-8">
        <n-form
            ref="formRef"
            class="mb-4"
            inline
            label-placement="left"
            :label-width="80"
            :model="searchState"
            size="medium"
            @keydown.enter.prevent="handleSearch"
        >
            <n-form-item label="英雄名" path="query">
                <n-input v-model:value.trim="searchState.query" />
            </n-form-item>
            <n-form-item>
                <n-button attr-type="button" @click="handleSearch">
                    验证
                </n-button>
            </n-form-item>
        </n-form>
        <div ref="hero-container" class="grid grid-autofill-80 gap-[20px_36px]">
            <section
                v-for="hero in heros"
                :key="hero.id_name"
                class="flex flex-col items-center"
            >
                <img
                    :src="`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg`"
                    :alt="hero.cname"
                    class="rounded-tl-xl rounded-br-xl"
                >
                <!-- <p class="line-clamp-1">{{ hero.cname }}</p> -->
                <p class="">{{ hero.cname }}</p>
            </section>
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, useTemplateRef } from 'vue'

interface Hero {
    ename: number
    cname: string
    id_name: string
    title: string
    new_type: number
    hero_type: number
    skin_name: string
    moss_id: number
}

const heros = ref<Hero[]>([])
const herosData: Hero[] = []

const getHeros = async () => {
    const res = await fetch('https://study.duyiedu.com/api/herolist')
    const json = await res.json()
    herosData.push(...json.data)
    heros.value = json.data
}

const searchState = reactive({
    query: ''
})

const heroContainer = useTemplateRef('hero-container')

const handleSearch = () => {
    const query = searchState.query
    const highlightName = 'highlight-results'
    CSS.highlights.delete(highlightName)
    if (!query) {
        heros.value = Array.from(herosData)
        return
    }
    heros.value = herosData.filter(hero => hero.cname.includes(query))
    nextTick(() => handleHighlight(query, getTextNodes(heroContainer.value!), highlightName))
}

const handleHighlight = (query: string, textNodes: Node[], highlightName = 'highlight-results') => {
    const ranges = textNodes.map(el => {
        const text = el.textContent?.toLowerCase() ?? ''
        const indices: number[] = []
        let index = text.indexOf(query)
        while (index !== -1) {
            indices.push(index)
            index = text.indexOf(query, index + query.length)
        }
        return indices.map(index => {
            const range = new Range()
            range.setStart(el, index)
            range.setEnd(el, index + query.length)
            return range
        })
    })
    const highlights = new Highlight(...ranges.flat())
    CSS.highlights.set(highlightName, highlights)
}
function getTextNodes(element: Node) {
    const textNodes: Node[] = []
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        node => node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    )
    let node
    while (node = walker.nextNode()) {
        textNodes.push(node)
    }
    return textNodes
}
onMounted(() => {
    getHeros()
})
</script>
