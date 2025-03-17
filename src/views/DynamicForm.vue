<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>
    <dynamic-form />
</template>

<script lang="ts" setup>
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { useDynamicFormData } from '@/composables/dynamicForm'
import { formConfig } from '@/config/testForm'

const { model } = useDynamicFormData({
    model: {
        switchTest: false,
        arr: [
            'pass'
        ]
    },
    config: formConfig,
    onSubmit: async data => {
        console.log(JSON.stringify(data, null, 2))
    }
})
// window.model = model
setTimeout(() => {
    model.switchTest = true
}, 1500)

</script>
