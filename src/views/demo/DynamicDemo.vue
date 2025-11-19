<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>
    <h2 class="text-xl my-2">Search Form</h2>
    <!-- <dynamic-form :id="id" /> -->

    <search-form />
    <h2 class="text-xl my-2">User Form</h2>
    <user-form message="sssss" />

    <h2 class="text-xl my-2">Test Form</h2>
    <TestForm />
</template>

<script lang="ts" setup>
import { useDynamicFormData } from '@/composables/dynamicForm'

const { DynamicForm: UserForm } = useDynamicFormData({
    span: 13,
    model: {
        name: 'john',
        age: 18
    },
    config: [
        {
            el: 'input',
            label: 'Name',
            path: 'name'
        },
        {
            el: 'input',
            label: 'Age',
            path: 'age'
        },
        {
            el: 'date',
            label: 'Test',
            path: 'a.b.c[0]',
            valueFormat: 't'
        }
    ],
    onSubmit: async data => {
        console.log(JSON.stringify(data, null, 2))
    }
})
</script>
