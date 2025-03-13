<template>
    <div class="">
        <div class="text-base flex items-center mb-3">
            <span class="text-lg">{{ title }}</span>
            <i
                v-if="!modelValue[path]?.length"
                class="i-AddCircleOutlined ml-5 cursor-pointer"
                style="width: 1.5em"
                @click="add"
            ></i>
        </div>
        <draggable
            v-model="modelValue[path]"
            :item-key="dynamicFormIdKey"
            ghost-class="bg-gray-100"
        >
            <template #item="{ index }">
                <div :class="dragBorderClass" class="mb-8 p-4 rounded-lg relative">
                    <div :class="operateIconClass" class="bottom-0 bg-gray-200 font-bold text-xs">
                        {{ index }}
                    </div>
                    <div :class="operateIconClass" class="gap-x-1.5 bottom-0 right-5 bg-white">
                        <i
                            v-if="index === modelValue[path].length - 1"
                            class="i-AddCircleOutlined"
                            @click="add"
                        ></i>
                        <i class="i-DeleteRound" @click.stop="deleteItem(index)"></i>
                        <i class="i-FileCopyRound" @click.stop="copy(index)"></i>
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
import { dynamicFormIdKey, useModelValue } from '@/composables/dynamicForm/useDynamic'
import { useInjectId } from '@/utils'
import { cloneDeep } from 'es-toolkit'
interface Props {
    title: string
    path: string
    children: DynamicItemType[]
}
const dragBorderClass = 'border border-dashed border-gray-300'
const operateIconClass = `
    absolute ${dragBorderClass}
    px-4 py-1 flex items-center rounded-full
    cursor-pointer translate-y-1/2
`
const getFormitem = (item: DynamicItemType, index: number) => {
    return {
        ...item,
        path: `${props.path}[${index}].${item.path}`
    }
}
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const add = () => {
    const newItem = useInjectId({}, dynamicFormIdKey)
    if (!Array.isArray(modelValue.value[props.path])) {
        modelValue.value[props.path] = [newItem]
        return
    }
    modelValue.value[props.path].push(newItem)
}
const deleteItem = (index: number) => {
    modelValue.value[props.path].splice(index, 1)
}

const copy = (index: number) => {
    const data = useInjectId(cloneDeep(modelValue.value[props.path][index]), dynamicFormIdKey)
    modelValue.value[props.path].splice(index, 0, data)
}

</script>
