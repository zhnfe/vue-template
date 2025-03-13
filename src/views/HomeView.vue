<template>
    <h1 class="text-center">Home</h1>
    <dynamic-form
        class="mx-auto w-[650px]"
        @submit="onSubmit"
    />
</template>

<script setup lang="ts">
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { formConfig } from '@/config/testForm'
import { useDynamicFormData, useSetModel } from '@/composables/dynamicForm'
const formData = useDynamicFormData({
    model: { switchTest: true },
    config: formConfig
})

// window.model = formData.model
setTimeout(() => {
    useSetModel(formData.model, {})
}, 2000)

const onSubmit = (data: AnyObject) => {
    console.log(JSON.stringify(data, null, 2))
}
</script>
