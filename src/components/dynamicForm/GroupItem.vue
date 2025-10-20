<template>
    <div>
        <dynamic-item
            v-for="item, index in children"
            :item="getFormitem(item)"
            :key="index"
        />
    </div>
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
interface Props {
    path: string
    label?: string
    children: DynamicItemType[]
}

const props = defineProps<Props>()
const getFormitem = (item: DynamicItemType) => {
    return {
        ...item,
        path: `${props.path}.${item.path}`
    }
}

</script>
