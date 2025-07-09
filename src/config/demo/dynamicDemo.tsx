import type { DynamicItem } from '@/types/dynamicForm'
import { h, reactive } from 'vue'

const stringRule = { required: false, message: 'this field is required', trigger: 'change' }
export const options = reactive([
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
        rules(model) {
            return [{
                validator: () => {
                    return model.arr?.[0] === 'pass'
                },
                message: 'Array Config Input 0 is not "pass"'
            }, {
                el: 'string',
                required: model.switchTest,
                message: '必填项'
            }]
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
        el: 'switch',
        label: 'switch test',
        path: 'switchTest',
        slots: {
            checked: () => h('span', 'checked'),
            unchecked: 'unchecked'
        }
    },
    {
        el: 'rate',
        label: 'rate test',
        path: 'rateTest',
        slots: {
            default: () => {
                return '✫'
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
    },
    {
        el: 'div',
        slots: { default: 'asdlfjaslkdfj' },
        props: {
            class: 'text-3xl text-red-700'
        }
    },
    {
        el: <div class="text5xl text-blue-500">hahaha</div>
    }
]

export const formConfig2: DynamicItem[] = [
    {
        el: <div class="text-3xl mb-6 text-red-700">基础配置</div>,
        span: 24
    },
    {
        el: 'input',
        label: '奖品名称',
        path: 'generalConfig.displayName',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        el: 'input',
        label: '描述',
        path: 'generalConfig.description',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        el: 'input',
        label: '奖品图片',
        path: 'generalConfig.awardImg',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            },
            {
                type: 'url',
                message: 'url格式不对',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        el: 'input',
        label: '资产图片',
        path: 'generalConfig.assetImg',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            },
            {
                type: 'url',
                message: 'url格式不对',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        el: 'number',
        label: '资产价值',
        path: 'generalConfig.assetValue',
        rules: [
            {
                type: 'number',
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        span: 6,
        el: 'date',
        label: '活动开始时间',
        path: 'generalConfig.startTime',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        span: 6,
        el: 'date',
        label: '活动结束时间',
        path: 'generalConfig.endTime',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        el: 'select',
        path: 'generalConfig.deleted',
        label: '是否下架',
        props: {
            options: [
                {
                    label: '是',
                    value: true
                },
                {
                    label: '否',
                    value: false
                }
            ]
        }
    },
    {
        el: 'input',
        label: '资产分类',
        path: 'generalConfig.inventoryCategory'
    },
    {
        el: 'number',
        label: '奖品id',
        path: 'generalConfig.awardId',
        rules: [
            {
                type: 'number',
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ]
    },
    {
        span: 24,
        el: 'switch',
        label: '是否是兑换奖品配置开关',
        path: 'generalConfig.isRedeemable'
    },

    {
        el: 'drag',
        label: '一层',
        span: 24,
        path: 'generalConfig.redeemInfo',
        visible: model => {
            return model.generalConfig?.isRedeemable
        },
        children: [
            {
                el: 'drag',
                label: '二层',
                path: 'redeemList',
                span: 24,
                children: [
                    {
                        el: 'select',
                        path: 'assetsType',
                        label: '兑换类型',
                        props: {
                            options: [
                                {
                                    label: '立提现金',
                                    value: 'amountLiti'
                                },
                                {
                                    label: '积分',
                                    value: 'point'
                                },
                                {
                                    label: '奖品id',
                                    value: 'prizeID'
                                },
                                {
                                    label: '红花',
                                    value: 'amountSmall'
                                }
                            ]
                        }
                    },
                    {
                        span: 24,
                        el: 'number',
                        label: '填写奖品id',
                        path: 'virtualId',
                        visible: (_model, curModel) => {
                            return curModel.assetsType === 'prizeID'
                        }
                    },
                    {
                        el: 'number',
                        label: '填写数量',
                        path: 'count',
                        rules: [
                            {
                                type: 'number',
                                required: true,
                                message: '这是必填项',
                                trigger: [
                                    'change',
                                    'blur'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        el: 'select',
        label: '配置类型',
        path: 'trickConfig.assetSubType',
        rules: [
            {
                required: true,
                message: '这是必填项',
                trigger: [
                    'change',
                    'blur'
                ]
            }
        ],
        span: 24,
        props: {
            options: [
                {
                    type: 'group',
                    label: '虚拟奖品',
                    key: 'virtualPrize',
                    children: [
                        {
                            label: '福卡',
                            value: 'luckyCard'
                        },
                        {
                            label: '皮肤',
                            value: 'skin'
                        },
                        {
                            label: '背景',
                            value: 'backgroundImage'
                        },
                        {
                            label: '套装',
                            value: 'suit'
                        },
                        {
                            label: '明信片',
                            value: 'postcard'
                        },
                        {
                            label: '虚拟商品',
                            value: 'virtualGoods'
                        },
                        {
                            label: '积分',
                            value: 'point'
                        },
                        {
                            label: '食物',
                            value: 'food'
                        },
                        {
                            label: '食材',
                            value: 'material'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '实物',
                    key: 'physicalPrize',
                    children: [
                        {
                            label: '实物',
                            value: 'entity'
                        },
                        {
                            label: '电商券',
                            value: 'coupon_shop'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '卡券包',
                    key: 'coupon',
                    children: [
                        {
                            label: '百度卡包优惠券',
                            value: 'coupon_boxcoupons'
                        },
                        {
                            label: '跳转至第三方',
                            value: 'coupon_default'
                        },
                        {
                            label: '通用兑换码',
                            value: 'coupon_cdkey'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '现金',
                    key: 'cash',
                    children: [
                        {
                            label: '小额现金',
                            value: 'amountSmall'
                        },
                        {
                            label: '大额现金',
                            value: 'amountBig'
                        },
                        {
                            label: '立提现金',
                            value: 'amountLiti'
                        }
                    ]
                }
            ]
        }
    },
    {
        el: 'number',
        label: '审核时间',
        path: 'assetParams.auditTime'
    },
    {
        el: 'number',
        label: '置顶权重',
        path: 'assetParams.topWeight'
    },
    {
        el: 'date',
        span: 6,
        label: '过期时间',
        path: 'assetParams.expiresTime',
        type: 'datetime',
        valueFormat: 't'
    },
    {
        span: 6,
        el: 'select',
        label: '计税类型',
        path: 'assetParams.tax',
        options(model: any) {
            return model.assetParams?.needAnti === 1
                ? [
                    {
                        label: '1',
                        value: 1
                    },
                    {
                        label: '2',
                        value: 0
                    }
                ]
                : []
        }
    },
    {
        span: 6,
        el: 'select',
        label: '是否需要离线审核',
        path: 'assetParams.needAnti',
        props: {
            options: [
                {
                    label: '需要审核',
                    value: 1
                },
                {
                    label: '不需要审核',
                    value: 0
                }
            ]
        }
    }
]
