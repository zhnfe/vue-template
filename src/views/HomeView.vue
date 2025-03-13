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
import { useDynamicFormData } from '@/composables/dynamicForm/useDynamic'
const formData = useDynamicFormData({
    model: { switchTest: true },
    config: formConfig
})

const onSubmit = async () => {
    console.log(JSON.stringify(formData.model, null, 2))
}
</script>
