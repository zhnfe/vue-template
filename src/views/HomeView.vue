<template>
    <h1 class="text-center">Home</h1>
    <!-- <home-menu msg="hello menu" /> -->
    <dynamic-form
        class="mx-auto w-[650px]"
        @submit="onSubmit"
    />
</template>

<script setup lang="ts">
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { formConfig } from '@/config/testForm'
import { useDynamicFormData } from '@/composables/dynamicForm'
// import HomeMenu from '@/components/HomeMenu'

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
