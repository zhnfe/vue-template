<template>
    <aside
        class="border-r-1 shrink-0 border-gray-200 relative transition-all duration-300"
        :class="{
            'w-12': collapsed,
            'w-75': !collapsed
        }"
    >
        <div
            class="absolute top-1/4 -right-4 px-1 py-0.5 rounded-full
                cursor-pointer bg-white shadow shadow-gray-400 text-black
                text-lg transition-all duration-300 z-10
            "
            :class="{ '-rotate-180': collapsed }"
            @click="collapsed = !collapsed"
        >
            <i-chevron-left />
        </div>
        <n-menu
            v-model:expanded-keys="expandedKeys"
            v-model:value="activeKey"
            style="overflow-y: auto"
            class="h-full"
            accordion
            :collapsed="collapsed"
            :options="menuOptions"
        />
    </aside>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import menus from '@/config/menu.json'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import IHome from './icons/IHome.vue'
import ICubeTransparent from './icons/ICubeTransparent.vue'
import ICommandLine from './icons/ICommandLine.vue'

interface MenuItem {
    pid: number
    title: string
    url?: string
    icon?: string
    children?: MenuItem[]
    sort?: number
}
const route = useRoute()

const activeKey = ref(route.name as string)
const expandedKeys = ref<string[]>([menus[0].pid + menus[0].title])
const collapsed = ref(window.innerWidth <= 950)
const iconMap: AnyObject = {
    home: IHome,
    'cube-transparent': ICubeTransparent,
    'command-line': ICommandLine
}

const dealMenu = (menus: MenuItem[]): MenuMixedOption[] => {
    return menus.map(item => {
        const Icon = item.icon ? iconMap[item.icon] : void 0
        return {
            label: item.url && !item.children
                ? () => <RouterLink to={{ name: item.url }}>{item.title}</RouterLink>
                : item.title,
            icon: item.icon ? () => <Icon /> : void 0,
            key: item.url || item.pid + item.title,
            children: item.children ? dealMenu(item.children) : void 0
        }
    })
}

const menuOptions = dealMenu(menus as MenuItem[])

</script>
