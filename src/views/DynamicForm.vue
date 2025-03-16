<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>
    <dynamic-form
        @submit="onSubmit"
    />
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
    config: formConfig
})

// window.model = model
setTimeout(() => {
    model.switchTest = true
}, 1500)

const onSubmit = (data: AnyObject) => {
    console.log(JSON.stringify(data, null, 2))
}
</script>
