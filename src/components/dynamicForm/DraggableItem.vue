<template>
    <vue-draggable
        v-model="modelValue[path]"
        :item-key="dynamicFormIdKey"
        animation="200"
        handle=".mover"
        ghost-class="bg-gray-100"
        chosen-class="bg-gray-100"
        drag-class="bg-gray-100!"
    >
        <template #header>
            <div class="text-base flex items-center mb-3">
                <span class="text-lg">{{ title }}</span>
                <i-add-circle-outlined
                    v-if="!modelValue[path]?.length"
                    class="ml-5 cursor-pointer"
                    style="width: 1.5em"
                    @click="add"
                />
            </div>
        </template>
        <template #item="{ index }">
            <div :class="dragBorderClass" class="mb-8 p-4 pb-0 rounded-lg relative">
                <div
                    :class="operateIconClass"
                    class="mover cursor-move bg-gray-200 font-bold text-xs"
                >
                    {{ index }}
                </div>
                <div :class="operateIconClass" class="gap-x-1.5 right-4 bg-white">
                    <i-add-circle-outlined
                        v-if="index === modelValue[path].length - 1"
                        class="cursor-pointer"
                        @click="add"
                    />
                    <i-delete-round class="cursor-pointer" @click.stop="deleteItem(index)" />
                    <i-file-copy class="cursor-pointer" @click.stop="copy(index)" />
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
    </vue-draggable>
</template>
<script lang="ts" setup>
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import VueDraggable from 'vuedraggable'
import { dynamicFormIdKey, useModelValue } from '@/composables/dynamicForm'
import { useInjectId } from '@/utils'
import { cloneDeep } from 'es-toolkit'
interface Props {
    title: string
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
        path: `${props.path}[${index}].${item.path}`
    }
}
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const add = () => {
    const newItem = useInjectId(cloneDeep(props.initialValue ?? {}), dynamicFormIdKey)
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

<!--
    group: { name: "...", pull: [true, false, clone],
    tag: 'td' // 默认div，设置draggable标签解析html标签
    v-model：data // 绑定数据列表
    put: [true, false, array] } //name相同的组可以互相拖动, pull可以写条件判断，是否允许拖走，put可以写条件判断，是否允许拖入
    sort: true,  // 内部拖动排序列表
    delay: 0, // 以毫秒为单位定义排序何时开始。
    touchStartThreshold: 0, // px,在取消延迟拖动事件之前，点应该移动多少像素?
    disabled: false, // 如果设置为真，则禁用sortable。
    animation: 150,  // ms, 动画速度运动项目排序时，' 0 ' -没有动画。
    handle: ".my-handle",  // 在列表项中拖动句柄选择器，设置某些地方拖动才有效。
    filter: ".ignore-elements",  // 不能拖拽的选择器(字符串 class)
    preventOnFilter: true, // 调用“event.preventDefault()”时触发“filter”
    draggable: ".item",  // 指定元素中的哪些项应该是可拖动的class。
    ghostClass: "sortable-ghost",  // 设置拖动元素的class的占位符的类名。
    chosenClass: "sortable-chosen",  // 设置被选中的元素的class
    dragClass: "sortable-drag",  //拖动元素的class。
    forceFallback: false,  // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
    fallbackClass: "sortable-fallback",  // 使用forceFallback时克隆的DOM元素的类名。
    fallbackOnBody: false,  // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
    fallbackTolerance: 0, // 用像素指定鼠标在被视为拖拽之前应该移动的距离。
    scroll: true, // or HTMLElement
    scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { ... },
    scrollSensitivity: 30, // px
    scrollSpeed: 10, // px
-->
