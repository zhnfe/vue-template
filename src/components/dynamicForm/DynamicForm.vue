<template>
    <n-form
        class="grid items-start grid-cols-24 gap-x-6"
        ref="form"
        v-bind="$attrs"
        :model="model"
        :label-placement="labelPosition"
    >
        <dynamic-item
            v-for="item in config"
            :key="item.path || item.label || item.key"
            :item="item"
        />
        <div v-if="showSaveButton" class="text-right col-span-24">
            <n-button
                type="primary"
                round
                @click="submit"
            >
                Submit
            </n-button>
        </div>
    </n-form>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import DynamicItem from './DynamicItem.vue'
import { useInjectFormData } from '@/composables/dynamicForm'
import { message } from '@/utils'
interface Props {
    labelPosition?: 'top' | 'left'
    showSaveButton?: boolean
}
withDefaults(defineProps<Props>(), {
    labelPosition: 'top',
    showSaveButton: true
})

const { model, config } = useInjectFormData()
const formRef = useTemplateRef('form')
const emits = defineEmits<{
    submit: [data: AnyObject]
}>()
const submit = async () => {
    try {
        await formRef.value?.validate()
        emits('submit', model)
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            return
        }
        message.error('Please fill in the form correctly')
    }
}
</script>
