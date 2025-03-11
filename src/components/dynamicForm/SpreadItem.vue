<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span>{{ title }}</span>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
        </template>
        <el-collapse v-model="activeNames">
            <el-collapse-item
                v-for="item, index in modelValue[prop]"
                :key="Math.random() + index"
                :name="index"
            >
                <template #title>
                    <div class="flex w-full">
                        <span>{{ `第${index + 1}项` }}</span>
                        <div class="ml-auto mr-6">
                            <el-button @click="moveUp(index)">上移</el-button>
                            <el-button @click="moveDown(index)">下移</el-button>
                            <el-button @click="copy(index)">复制</el-button>
                            <el-button @click="deleteItem(index)">删除</el-button>
                        </div>
                    </div>
                </template>
                <div class="grid grid-cols-24 gap-x-6">
                    <dynamic-item
                        v-for="formItem, formIndex in children"
                        :item="getFormitem(formItem, index)"
                        :key="Math.random() + formIndex"
                    />
                </div>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { DynamicItem as DynamicItemType } from '@/types/dynamicForm'
import DynamicItem from './DynamicItem.vue'
import { useModelValue } from '@/composables/dynamicForm/useDynamicFormData'
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
const { modelValue } = useModelValue()
const props = defineProps<Props>()
const activeNames = ref<number[]>(0)
const add = () => {
    if (!Array.isArray(modelValue.value[props.prop])) {
        modelValue.value[props.prop] = [{}]
        // activeNames.value = [0]
        return
    }
    modelValue.value[props.prop].push({})
    // activeNames.value.push(modelValue.value[props.prop].length - 1)
}
const deleteItem = (index: number) => {
    modelValue.value[props.prop].splice(index, 1)
    // activeNames.value = activeNames.value.filter(item => item !== index)
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
