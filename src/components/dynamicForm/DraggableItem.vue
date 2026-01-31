<template>
    <div>
        <div class="text-base flex items-center mb-3">
            <span class="text-lg">{{ label }}</span>
            <IconAddCircleFill
                v-if="!modelValue[path]?.length"
                class="ml-5 cursor-pointer"
                style="width: 1.5em"
                @click="add"
            />
        </div>
        <div ref="sortableRef">
            <div
                v-for="item, index in modelValue[path] as Array<AnyObject>"
                :key="item[dynamicFormIdKey]"
                :class="dragBorderClass"
                class="mb-8 p-4 pb-0 rounded-lg relative"
            >
                <div
                    :class="operateIconClass"
                    class="mover cursor-move bg-gray-200 font-bold text-xs"
                >
                    {{ index }}
                </div>
                <div :class="operateIconClass" class="gap-x-1.5 right-4 bg-white">
                    <IconAddCircle
                        v-if="index === modelValue[path].length - 1"
                        class="cursor-pointer"
                        @click="add"
                    />
                    <IconDelete class="cursor-pointer" @click.stop="deleteItem(index)" />
                    <IconFileCopy class="cursor-pointer" @click.stop="copy(index)" />
                </div>
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
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import { dynamicFormIdKey, useModelValue } from '@/composables/dynamicForm'
import { useInjectId } from '@/utils'
import { cloneDeep } from 'es-toolkit'
import { useTemplateRef } from 'vue'
import { useSortable } from '@/composables'
interface Props {
    label: string
    path: string
    initialValue?: AnyObject
    children: DynamicItemType[]
}
const dragBorderClass = 'border border-dashed border-gray-300'
const operateIconClass = `
    absolute bottom-0 ${dragBorderClass}
    px-4 py-1 flex items-center rounded-full
    translate-y-1/2
`
const getFormitem = (item: DynamicItemType, index: number) => {
    return {
        ...item,
        path: `${props.path}[${index}].${item.path}`,
        parrentPath: `${props.path}[${index}]`
    }
}
const { modelValue } = useModelValue()
const props = defineProps<Props>()

useSortable({
    selector: useTemplateRef('sortableRef'),
    ghostClass: 'bg-gray-100!',
    chosenClass: 'bg-gray-100',
    handle: '.mover',
    onEnd: ({ oldIndex, newIndex }) => {
        if (newIndex === void 0 || oldIndex === 0 || newIndex === oldIndex) {
            return
        }
        const [deleted] = modelValue[props.path].splice(oldIndex, 1)
        modelValue[props.path].splice(newIndex, 0, deleted)
    }
})
const add = () => {
    const newItem = useInjectId(cloneDeep(props.initialValue ?? {}), dynamicFormIdKey)
    if (!Array.isArray(modelValue[props.path])) {
        modelValue[props.path] = [newItem]
        return
    }
    modelValue[props.path].push(newItem)
}
const deleteItem = (index: number) => {
    modelValue[props.path].splice(index, 1)
}

const copy = (index: number) => {
    const data = useInjectId(cloneDeep(modelValue[props.path][index]), dynamicFormIdKey)
    modelValue[props.path].splice(index, 0, data)
}

</script>
