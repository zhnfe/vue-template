<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>
    <dynamic-form />
    <pre>{{ datastr }}</pre>
</template>

<script lang="ts" setup>
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { useDynamicFormData } from '@/composables/dynamicForm'
import { formConfig2 } from '@/config/demo/dynamicDemo'
import { computed } from 'vue'

const { model } = useDynamicFormData({
    model: {
        switchTest: false,
        arr: [
            'pass'
        ]
    },
    config: formConfig2,
    onSubmit: async data => {
        console.log(JSON.stringify(data, null, 2))
    }
})
const datastr = computed(() => {
    return JSON.stringify(model, null, 2)
})
setTimeout(() => {
    model.switchTest = true
}, 3500)

</script>
