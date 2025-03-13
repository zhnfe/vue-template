import type { DynamicItem } from '@/types/dynamicForm'
import { h, reactive } from 'vue'

const stringRule = { required: true, message: 'this field is required', trigger: 'change' }
const options = reactive([
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
])

export const formConfig: DynamicItem[] = [
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
                span: 24,
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
        span: 24,
        el: 'input',
        label: 'nested Input1',
        path: 'nested.arrayConfigInput',
        rules: stringRule,
        generateRules(modelValue) {
            this.rules = {
                validator: () => {
                    return modelValue['arr[0]'] === 'pass'
                },
                message: 'Array Config Input 0 is not "pass"'
            }
        }
    },
    {
        el: 'input',
        label: 'Array Config Input 0',
        path: 'arr[0]'
    },
    {
        el: 'input',
        label: 'Array Config Input 1',
        path: 'arr[1]'
    },
    {
        span: 4,
        el: 'switch',
        label: 'switch test',
        path: 'switchTest',
        slots: {
            checked: () => h('span', 'checked'),
            unchecked: 'unchecked'
        }
    },
    {
        span: 14,
        el: 'select',
        label: 'select test',
        path: 'selectTest',
        props: {
            options
        }
    },
    {
        span: 6,
        el: 'rate',
        label: 'rate test',
        path: 'rateTest',
        slots: {
            default: () => {
                return '😄'
            }
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
