<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>

    <h2 class="text-xl my-2">User Form</h2>
    <div class="flex">
        <UserForm message="sssss" class="flex-1" />
        <pre>{{ JSON.stringify(model, null, 2) }}</pre>
    </div>
</template>

<script lang="ts" setup>
import { useDynamicFormData } from '@/composables/dynamicForm'

const { DynamicForm: UserForm, model } = useDynamicFormData({
    span: 24,
    model: {
        name: 'john',
        age: 18,
        test: []
    },
    config: [
        {
            el: 'input',
            label: 'Name',
            path: 'name'
        },
        {
            el: 'number',
            label: 'Age',
            path: 'age',
            span: 12
        },
        {
            span: 12,
            el: 'date',
            label: 'Test',
            path: 'a.b.c[0]',
            valueFormat: 't'
        },
        {
            el: 'drag',
            label: 'test',
            path: 'test',
            children: [
                {
                    span: 12,
                    el: 'input',
                    lagel: 'testName',
                    path: 'testName'
                },
                {
                    span: 12,
                    el: 'input',
                    lagel: 'testName2',
                    path: 'testName2'
                }
            ]
        }
    ],
    onSubmit: async (data) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(data, null, 2))
    }
})
</script>
