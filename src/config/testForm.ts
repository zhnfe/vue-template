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
        label: 'Array Config Input1',
        prop: 'nested.arrayConfigInput'
    },
    {
        el: 'input',
        label: 'Array Config Input 3',
        prop: 'arr[0]'
    },
    {
        el: 'input',
        label: 'Array Config Input 3',
        prop: 'arr[1]'
    },
    {
        span: 4,
        el: 'switch',
        label: 'switch test',
        prop: 'switchTest',
        slots: {
            checked: () => h('span', 'checked'),
            unchecked: 'unchecked'
        }
    },
    {
        span: 4,
        el: 'select',
        label: 'select test',
        prop: 'selectTest',
        props: {
            options
        }
    },
    {
        span: 4,
        el: 'rate',
        label: 'rate test',
        prop: 'rateTest',
        slots: {
            default: ({ index }: { index: number }) => {
                return index + '★'
            }
        }
    },
    {
        span: 24,
        el: 'spread',
        prop: 'spreadTest',
        notForm: true,
        visible: (model: Record<string, any>) => {
            return model.switchTest
        },
        clearOnHide: true,
        props: {
            title: 'Spread Component',
            children: [
                {
                    el: 'input',
                    label: 'Spread Input 1',
                    prop: 'input1',
                    rules: stringRule
                },
                {
                    el: 'switch',
                    label: 'spread switch',
                    prop: 'spreadSwitch',
                    props: {
                        activeText: 'open',
                        inactiveText: 'close',
                        inlinePrompt: true
                    }
                },
                {
                    span: 24,
                    el: 'spread',
                    prop: 'spreadTest',
                    notForm: true,
                    props: {
                        title: 'Spread Component Nested',
                        children: [
                            {
                                el: 'input',
                                label: 'Spread Input 1',
                                prop: 'input1',
                                rules: stringRule
                            },
                            {
                                el: 'switch',
                                label: 'spread switch',
                                prop: 'spreadSwitch',
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
