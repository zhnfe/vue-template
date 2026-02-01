<template>
    <n-form
        ref="form"
        class="grid items-start grid-cols-24 gap-x-4 max-sm:gap-x-2"
        v-bind="$attrs"
        :model="model"
        :label-placement="labelPosition"
    >
        <DynamicItem
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
import { provide, ref, useTemplateRef } from 'vue'
import { useInjectFormData } from '@/composables/dynamicForm'
import { message } from '@/utils'
import DynamicItem from './DynamicItem.vue'

interface Props {
    labelPosition?: 'top' | 'left'
    showSaveButton?: boolean
    id?: symbol
}
const props = withDefaults(defineProps<Props>(), {
    labelPosition: 'top',
    showSaveButton: true,
    id: void 0
})

provide('id', props.id)
const submitLoading = ref(false)
const { model, config, onSubmit } = useInjectFormData(props.id)
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
