<template>
    <el-form
        class="grid grid-cols-24 gap-x-6"
        ref="form"
        v-bind="$attrs"
        :model="model"
        :label-position="labelPosition"
    >
        <dynamic-item
            v-for="item in config"
            :key="item.prop || item.label || item.key"
            :item="item"
        />
        <div v-if="showSaveButton" class="text-right mt-6 col-span-24">
            <el-button type="primary" @click="submit">Submit</el-button>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import DynamicItem from './DynamicItem.vue'
import { useInjectFormData } from '@/composables/dynamicForm/useDynamicFormData'
import { ElMessage } from 'element-plus'
interface Props {
    labelPosition?: 'top' | 'left' | 'right'
    showSaveButton?: boolean
}
withDefaults(defineProps<Props>(), {
    labelPosition: 'top',
    showSaveButton: true
})

const { model, config } = useInjectFormData()
const formRef = useTemplateRef('form')
const emits = defineEmits(['submit'])
const submit = async () => {
    try {
        await formRef.value?.validate()
        emits('submit')
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            return
        }
        ElMessage.error('Please fill in the form correctly')
    }
}
</script>
