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
        span: 24,
        el: 'h1',
        props: {
            class: 'text-center w-full'
        },
        slots: {
            default: 'h1 slotssss'
        }
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
        span: 24,
        el: 'drag',
        path: 'spreadTest',
        notForm: true,
        visible: (model: Record<string, any>) => {
            return model.switchTest
        },
        clearOnHide: true,
        props: {
            title: 'Outer',
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
                    span: 24,
                    el: 'drag',
                    path: 'spreadInner',
                    notForm: true,
                    props: {
                        title: 'Inner',
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
                }
            ]
        }
    }

]
