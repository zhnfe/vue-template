<template>
    <n-card>
        <template #header>
            <div class="flex justify-between">
                <span>{{ title }}</span>
                <n-button type="primary" @click="add">新增</n-button>
            </div>
        </template>

        <div class="border border-gray-200 rounded-xl overflow-hidden">
            <div
                v-for="_item, index in modelValue[prop]"
                :key="Math.random() + index"
                :name="index"
                class="not-last:border-b-1 border-gray-200"
                @click="open.includes(index) ? open = open.filter(item => item !== index): open.push(index)"
            >
                <div class="flex items-center w-full px-3 py-2 bg-gray-50 cursor-pointer">
                    <div class="text-base">{{ `第${index + 1}项` }}</div>
                    <div class="ml-auto mr-6">
                        <n-button @click="moveUp(index)">上移</n-button>
                        <n-button @click="moveDown(index)">下移</n-button>
                        <n-button @click="copy(index)">复制</n-button>
                        <n-button @click="deleteItem(index)">删除</n-button>
                    </div>
                </div>
                <div
                    class="grid transition-all"
                    :class="open.includes(index) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                >
                    <div
                        class="grid grid-cols-24 gap-x-6 px-3 overflow-hidden min-h-0"
                    >
                        <dynamic-item
                            v-for="formItem, formIndex in children"
                            :item="getFormitem(formItem, index)"
                            :key="Math.random() + formIndex"
                        />
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import { useModelValue } from '@/composables/dynamicForm/useDynamicFormData'
import { ref } from 'vue'
interface Props {
    title: string
    prop: string
    children: DynamicItemType[]
}
const getFormitem = (item: DynamicItemType, index: number) => {
    return {
        ...item,
        prop: `${props.prop}[${index}].${item.prop}`
    }
}
const open = ref([])
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const add = () => {
    if (!Array.isArray(modelValue.value[props.prop])) {
        modelValue.value[props.prop] = [{}]
        // activeNames.value = [0]
        return
    }
    modelValue.value[props.prop].push({})
}
const deleteItem = (index: number) => {
    modelValue.value[props.prop].splice(index, 1)
}

const moveUp = (index: number) => {
    if (index === 0) return
    const temp = modelValue.value[props.prop][index]
    modelValue.value[props.prop][index] = modelValue.value[props.prop][index - 1]
    modelValue.value[props.prop][index - 1] = temp
}
const moveDown = (index: number) => {
    if (index === modelValue.value[props.prop].length - 1) return
    const temp = modelValue.value[props.prop][index]
    modelValue.value[props.prop][index] = modelValue.value[props.prop][index + 1]
    modelValue.value[props.prop][index + 1] = temp
}

const copy = (index: number) => {
    modelValue.value[props.prop].splice(index, 0, { ...modelValue.value[props.prop][index] })
}
</script>
