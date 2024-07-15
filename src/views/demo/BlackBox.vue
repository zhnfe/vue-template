<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { tabs } from './config'

const state = reactive({
    currentIndex: 0
})
interface DomsInfo {
    width: number;
    x: number;
}
const navItemsRef = ref<HTMLDivElement[]>()
const tabItemsRef = ref<HTMLDivElement[]>()
const tabDomsInfo: DomsInfo[] = []

onMounted(() => {
    tabItemsRef.value?.slice(0, tabs.length).forEach(item => {
        const rect = item.getBoundingClientRect()
        tabDomsInfo.push({
            width: rect.width,
            x: rect.x
        })
    })
    console.log(tabDomsInfo)
})
function handleTabClick(e: MouseEvent, index: number) {
    const target = e.target as HTMLDivElement
    target.scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
    })
    const nav = navItemsRef.value![1]
    const tabInfo = tabDomsInfo[index]
    nav.style.clipPath = `inset(0 ${tabInfo.x + tabInfo.width}px 0 ${tabInfo.x}px)`
    console.log(tabInfo)
    state.currentIndex = index
}

</script>

<template>
    <div class="black-box">
        <header class="header">
            <h2 class="title">
                小黑盒 tab
            </h2>
            <div class="nav-container">
                <nav
                    v-for="num in 2"
                    :key="num"
                    ref="navItemsRef"
                    class="nav"
                >
                    <div class="tab">
                        <div
                            v-for="item, index in tabs"
                            :key="item.id"
                            ref="tabItemsRef"
                            class="tab-item"
                            @click="(e: MouseEvent) => handleTabClick(e, index)"
                        >
                            {{ item.value }}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <main class="content-container" :style="{ transform: `translateX(-${state.currentIndex * 100}%)` }">
            <div
                v-for="item in tabs"
                :key="item.id"
                class="content"
            >
                <div class="content-title">
                    {{ item.value }}
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
.black-box {
    --bg-color: #fff;
    --color: #222;
    --color-deactive: #666;
    --tab-slider-bar-color: var(--color);
    --content-bg-color: #e7f0dc;
    --contnet-color: #333;
}

@media (prefers-color-scheme: dark) {
    .black-box {
        --bg-color: #222;
        --color: #eee;
        --color-deactive: #aaa;
        --content-bg-color: #3a3431;
        --contnet-color: #eee;
    }
}

.black-box {
    max-width: 650px;
    margin: auto;
    position: fixed;
    inset: 0;
    z-index: 2;
    background-color: var(--bg-color);
    color: var(--color);
}

.header {
    position: sticky;
    top: 0;

    .title {
        margin: 0;
        padding: 20px 0;
        text-align: center;
    }

    .nav-container {
        margin: 0 10px;
        position: relative;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .nav {
            color: var(--color-deactive);

            .tab {
                display: flex;
                column-gap: 10px;

                .tab-item {
                    flex: 0 0 fit-content;
                    line-height: 2.5;
                    transition: color .3s ease-in;
                }
            }
        }

        .nav:last-child {
            position: absolute;
            top: -20px;
            color: var(--color);
        }
    }
}

.content-container {
    height: calc(100% - 110px);
    display: flex;
    transition: all .3s ease-in-out;

    .content {
        overflow-y: scroll;
        flex: 0 0 100%;
        background-color: var(--content-bg-color);
        color: var(--contnet-color);

        .content-title {
            margin: 50% 0 0;
            text-align: center;
            font-size: 32px;
        }
    }

}
</style>