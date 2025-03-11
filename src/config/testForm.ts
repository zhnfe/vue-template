import type { DynamicItem } from '@/types/dynamicForm'

const stringRule = { required: true, message: 'this field is required', trigger: 'change' }

export const formConfig: DynamicItem[] = [
    {
        span: 24,
        el: 'h1',
        props: {
            class: 'text-center w-full'
        },
        slot: 'string slot'
    },
    {
        span: 24,
        el: 'input',
        label: 'Array Config Input1',
        prop: 'nested.arrayConfigInput',
        rules: stringRule
    },
    {
        span: 12,
        el: 'input',
        label: 'Array Config Input 2',
        prop: 'nested.arrayConfigInput2',
        rules: stringRule,
        visible: (model: Record<string, any>) => {
            return model.switchTest
        },
        clearOnHide: true
    },
    {
        el: 'input',
        label: 'Array Config Input 3',
        prop: 'arr[0]',
        rules: stringRule
    },
    {
        el: 'input',
        label: 'Array Config Input 3',
        prop: 'arr[1]',
        rules: stringRule
    },
    {
        el: 'switch',
        label: 'switch test',
        prop: 'switchTest',
        props: {
            activeText: 'open',
            inactiveText: 'close'
        }
    },
    {
        span: 24,
        el: 'spread',
        prop: 'spreadTest',
        notForm: true,
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
