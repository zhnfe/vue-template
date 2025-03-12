<template>
    <h1 class="text-center">Home</h1>
    <n-card class="mx-6">
        <dynamic-form
            @submit="onSubmit"
        />
    </n-card>
    <div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { formConfig } from '@/config/testForm'
import { useDynamicFormData } from '@/composables/dynamicForm/useDynamicFormData'
const formData = useDynamicFormData({
    model: { switchTest: true, spreadTest: [{}, {}] },
    config: formConfig
})

const onSubmit = async () => {
    console.log(toRaw(formData.model))
}
</script>
