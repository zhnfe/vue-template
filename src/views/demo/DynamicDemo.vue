<template>
    <h1 class="text-center text-2xl mb-2">Dynamic Form</h1>
    <dynamic-form />
</template>

<script lang="ts" setup>
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { useDynamicFormData } from '@/composables/dynamicForm'
import type { DynamicItem } from '@/types/dynamicForm'
import { h, reactive } from 'vue'

const stringRule = { required: true, message: 'this field is required', trigger: 'change' }
const options = reactive([
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
])

const formConfig: DynamicItem[] = [
    {
        el: 'switch',
        label: 'Show Group',
        path: 'showGroup'
    },
    {
        el: 'group',
        path: 'group',
        notForm: true,
        children: [
            {
                el: 'input',
                label: 'group item 1',
                path: 'itme1',
                rules: stringRule
            },
            {
                el: 'drag',
                path: 'spread',
                notForm: true,
                visible: (model: Record<string, any>) => {
                    return model.switchTest
                },
                clearOnHide: true,
                title: 'Human Configuration',
                children: [
                    {
                        el: 'input',
                        label: 'Spread Input',
                        path: 'input',
                        rules: stringRule
                    },
                    {
                        el: 'switch',
                        label: 'spread switch',
                        path: 'switch'
                    }
                ]
            }
        ],
        visible: model => model.showGroup,
        clearOnHide: true
    },
    {
        el: 'input',
        label: 'nested Input1',
        path: 'nested.arrayConfigInput',
        rules: stringRule,
        generateRules(model) {
            this.rules = {
                validator: () => {
                    return model.arr?.[0] === 'pass'
                },
                message: 'Array Config Input 0 is not "pass"'
            }
        }
    },
    {
        span: 12,
        el: 'input',
        label: 'Array Config Input 0',
        path: 'arr[0]'
    },
    {
        span: 12,
        el: 'input',
        label: 'Array Config Input 1',
        path: 'arr[1]'
    },
    {
        span: 12,
        el: 'switch',
        label: 'switch test',
        path: 'switchTest',
        slots: {
            checked: () => h('span', 'checked'),
            unchecked: 'unchecked'
        }
    },
    {
        span: 12,
        el: 'rate',
        label: 'rate test',
        path: 'rateTest',
        slots: {
            default: () => {
                return '哈'
            }
        }
    },
    {
        el: 'select',
        label: 'select test',
        path: 'selectTest',
        props: {
            options
        }
    },
    {
        el: 'drag',
        path: 'spreadTest',
        notForm: true,
        visible: (model: Record<string, any>) => {
            return model.switchTest
        },
        clearOnHide: true,
        title: 'Human Configuration',
        initialValue: { spread1: true },
        children: [
            {
                el: 'input',
                label: 'Spread Input',
                path: 'spreadNested.input',
                rules: stringRule
            },
            {
                el: 'switch',
                label: 'spread switch',
                path: 'spread1'
            },
            {
                el: 'drag',
                path: 'spreadInner',
                notForm: true,
                title: 'Test Inner Configuration',
                initialValue: { input1: '11' },
                children: [
                    {
                        el: 'input',
                        label: 'Spread Input 1',
                        path: 'input1',
                        rules: stringRule
                    },
                    {
                        el: 'switch',
                        label: 'spread switch',
                        path: 'spreadSwitch',
                        props: {
                            activeText: 'open',
                            inactiveText: 'close',
                            inlinePrompt: true
                        }
                    }
                ]
            }
        ]
    }

]

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
setTimeout(() => {
    model.switchTest = true
    options[0].label = 'Option 1 changed'
}, 1500)

</script>
