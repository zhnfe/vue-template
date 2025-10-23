<template>
    <aside
        class="border-r shrink-0 border-gray-200 relative transition-all duration-300"
        :class="{
            'w-12': collapsed,
            'w-65': !collapsed
        }"
    >
        <div
            class="absolute top-1/4 -right-4 p-1 rounded-full
                cursor-pointer bg-white shadow shadow-gray-400 text-black
                text-lg transition-all duration-300 z-10
            "
            :class="{ '-rotate-180': collapsed }"
            @click="collapsed = !collapsed"
        >
            <IconChevronLeft class="block" />
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
import { ref, type VNode } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getMenuPath, menus } from '@/config/menu'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import IconHome from 'virtual:icon-components/IconHome.vue'
import IconDeployedCodeFill from 'virtual:icon-components/IconDeployedCodeFill.vue'
import IconTerminal from 'virtual:icon-components/IconTerminal.vue'
import IconDeployedCode from 'virtual:icon-components/IconDeployedCode.vue'
interface MenuItem {
    pid: number
    title: string
    url?: string
    icon?: string
    children?: MenuItem[]
    sort?: number
}
// 获取菜单项的唯一 key, 抽离出来方便复用
const getMenuItemKey = (item: MenuItem) => item.url ?? (item.pid + item.title)

const route = useRoute()
const routeName = (route.name || '') as string

// 计算出当前菜单路径, 生成默认展开的菜单项
const currentPath = getMenuPath(menus, routeName)
const expandedKeys = ref(currentPath.map(getMenuItemKey))
const activeKey = ref(routeName)

const collapsed = ref(window.innerWidth <= 950)

const iconMap: Record<string, VNode> = {
    home: <IconHome />,
    'cube-transparent': <IconDeployedCodeFill />,
    'command-line': <IconTerminal />,
    default: <IconDeployedCode />
}

const dealMenu = (menus: MenuItem[]): MenuMixedOption[] => {
    return menus.map(item => {
        return {
            label: item.url && !item.children
                ? () => <RouterLink to={{ name: item.url }}>{item.title}</RouterLink>
                : item.title,
            icon: () => iconMap[item.icon ?? 'default'],
            key: getMenuItemKey(item),
            children: item.children ? dealMenu(item.children) : void 0
        }
    })
}

const menuOptions = dealMenu(menus as MenuItem[])

</script>
