<template>
    <n-form
        class="grid items-start grid-cols-24 gap-x-4 max-sm:gap-x-2"
        ref="form"
        v-bind="$attrs"
        :model="model"
        :label-placement="labelPosition"
    >
        <dynamic-item
            v-for="item, index in config"
            :key="item.path || item.label || item.key || index"
            :item="item"
        />
        <div v-if="showSaveButton" class="text-right col-span-24">
            <n-button
                type="primary"
                round
                :loading="submitLoading"
                @click="submit"
            >
                Submit
            </n-button>
        </div>
    </n-form>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
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
const submitLoading = ref(false)
const { model, config, onSubmit } = useInjectFormData()
const formRef = useTemplateRef('form')
const submit = async () => {
    submitLoading.value = true
    try {
        await formRef.value?.validate()
        onSubmit(model)
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            throw e
        }
        message.error('Please fill in the form correctly')
    }
    finally {
        submitLoading.value = false
    }
}
</script>
