<template>
    <div class="p-4 border border-gray-200 rounded-lg overflow-hidden">
        <div class="flex justify-between">
            <div class="text-lg mb-3">{{ title }}</div>
            <n-button type="primary" @click="add">新增</n-button>
        </div>
        <draggable
            v-model="modelValue[prop] as unknown[]"
            item-key="id"
            ghost-class="bg-gray-100"
        >
            <template #item="{ index }">
                <div class="not-last:border-b-1 border-gray-200 not-last:mb-5">
                    <div class="ml-auto">
                        <n-button @click.stop="copy(index)">复制</n-button>
                        <n-button @click.stop="deleteItem(index)">删除</n-button>
                    </div>
                    <div class="grid grid-cols-24 gap-x-6 px-3 my-3">
                        <dynamic-item
                            v-for="formItem, formIndex in children"
                            :item="getFormitem(formItem, index)"
                            :key="formIndex"
                        />
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import draggable from 'vuedraggable'
import { useModelValue } from '@/composables/dynamicForm/useDynamicFormData'
interface Props {
    title: string
    prop: string
    children: DynamicItemType[]
}
const getFormitem = (item: DynamicItemType, index: number) => {
    console.log(`${props.prop}[${index}].${item.prop}`, modelValue.value[`${props.prop}[${index}].${item.prop}`])
    return {
        ...item,
        prop: `${props.prop}[${index}].${item.prop}`
    }
}
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const add = () => {
    if (!Array.isArray(modelValue.value[props.prop])) {
        modelValue.value[props.prop] = [{}]
        return
    }
    modelValue.value[props.prop].push({})
}
const deleteItem = (index: number) => {
    modelValue.value[props.prop].splice(index, 1)
}

const copy = (index: number) => {
    modelValue.value[props.prop].splice(index, 0, { ...modelValue.value[props.prop][index] })
}

</script>
