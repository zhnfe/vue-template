<template>
    <n-card>
        <template #header>
            <div class="flex justify-between">
                <span>{{ label }}</span>
                <n-button type="primary" @click="add">新增</n-button>
            </div>
        </template>

        <div class="border border-gray-200 rounded-xl overflow-hidden">
            <div
                v-for="_item, index in modelValue[path]"
                :key="index"
                :name="index"
                class="not-last:border-b-1 border-gray-200"
            >
                <div
                    class="flex items-center w-full px-3 py-2 bg-gray-50 cursor-pointer select-none"
                    @click="onTitleClick(index)"
                >
                    <IconChevronRight class="transition-all" :class="open.includes(index) ? 'rotate-90' : ''" />
                    <div class="text-base">{{ `第${index + 1}项` }}</div>
                    <div class="ml-auto">
                        <n-button :disabled="index === 0" @click.stop="moveUp(index)">上移</n-button>
                        <n-button :disabled="index === modelValue[path].length - 1" @click.stop="moveDown(index)">下移</n-button>
                        <n-button @click.stop="copy(index)">复制</n-button>
                        <n-button @click.stop="deleteItem(index)">删除</n-button>
                    </div>
                </div>
                <div class="grid transition-all" :class="open.includes(index) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                    <div class="overflow-hidden">
                        <div class="grid grid-cols-24 gap-x-6 px-3 my-3">
                            <dynamic-item
                                v-for="formItem, formIndex in children"
                                :item="getFormitem(formItem, index)"
                                :key="formIndex"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import { useModelValue } from '@/composables/dynamicForm'
import { ref } from 'vue'
interface Props {
    label: string
    path: string
    children: DynamicItemType[]
}
const getFormitem = (item: DynamicItemType, index: number) => {
    return {
        ...item,
        path: `${props.path}[${index}].${item.path}`
    }
}
const open = ref([0])
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const add = () => {
    if (!Array.isArray(modelValue.value[props.path])) {
        modelValue.value[props.path] = [{}]
        return
    }
    modelValue.value[props.path].push({})
}
const deleteItem = (index: number) => {
    modelValue.value[props.path].splice(index, 1)
}

const moveUp = (index: number) => {
    if (index === 0) return
    const temp = modelValue.value[props.path][index]
    modelValue.value[props.path][index] = modelValue.value[props.path][index - 1]
    modelValue.value[props.path][index - 1] = temp
}
const moveDown = (index: number) => {
    if (index === modelValue.value[props.path].length - 1) return
    const temp = modelValue.value[props.path][index]
    modelValue.value[props.path][index] = modelValue.value[props.path][index + 1]
    modelValue.value[props.path][index + 1] = temp
}

const copy = (index: number) => {
    modelValue.value[props.path].splice(index, 0, { ...modelValue.value[props.path][index] })
}

const onTitleClick = (index: number) => {
    if (open.value.includes(index)) {
        open.value = open.value.filter(i => i !== index)
    }
    else {
        open.value.push(index)
    }
}
</script>
