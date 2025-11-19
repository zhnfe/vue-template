<template>
    <template v-if="visible">
        <n-form-item
            v-if="isFormItem"
            :style="{gridColumn: `span ${item.span ?? span}`}"
            :path="item.path"
            :label="item.label"
            :rule="rules"
        >
            <component
                :is="getEl()"
                :options="options"
                v-bind="getProps()"
            >
                <template
                    v-for="slot, key in item.slots"
                    :key="key"
                    #[key]="values"
                >
                    <component :is="getSlot(slot, values)" />
                </template>
            </component>
        </n-form-item>
        <component
            v-else
            v-bind="getProps()"
            :style="{gridColumn: `span ${item.span ?? span}`}"
            :is="getEl()"
        >
            <template
                v-for="slot, key in item.slots"
                :key="key"
                #[key]="values"
            >
                <component :is="getSlot(slot, values)" />
            </template>
        </component>
    </template>
</template>

<script lang="ts" setup>
import { useInjectFormData, useModelValue } from '@/composables/dynamicForm'
import type { DynamicItem } from '@/types/dynamicForm'
import { NInput, NCard, NSelect, NSwitch, NRate, NInputNumber, NDatePicker } from 'naive-ui'
import { computed, h, watch, type Component } from 'vue'
import SpreadItem from './SpreadItem.vue'
import DraggableItem from './DraggableItem.vue'
import GroupItem from './GroupItem.vue'
import { omit } from 'es-toolkit'

const components: Record<string, Component | {
    component: Component
    model: string
    props?: object
}> = {
    input: NInput,
    number: NInputNumber,
    date: {
        component: NDatePicker,
        model: 'formattedValue'
    },
    card: NCard,
    select: NSelect,
    switch: NSwitch,
    rate: NRate,
    spread: SpreadItem,
    drag: DraggableItem,
    group: GroupItem
} as const

interface Props {
    item: DynamicItem
}

const { item } = defineProps<Props>()
const { span } = useInjectFormData()

const isFormItem = (() => {
    const notFormEl = ['spread', 'drag', 'group']
    return item.path && !notFormEl.includes(item.el as string)
})()

const { model, modelValue } = useModelValue()

const nonPropsKeys = ['el', 'visible', 'parrentPath', 'clearOnHide',
    'rules', 'span', 'slots', 'options'
] as const
const getProps = () => {
    if (item.props) {
        return item.props
    }
    return omit(item, nonPropsKeys)
}

const getEl = () => {
    const elName = item.el
    if (typeof elName === 'string' && elName in components) {
        const el = components[elName]
        if ('component' in el) {
            return h(el.component, {
                [el.model]: modelValue[item.path!],
                [`onUpdate:${el.model}`](e: string | number) { modelValue[item.path!] = e }
            })
        }
        return h(el, {
            value: modelValue[item.path!],
            onUpdateValue: (e: string | number) => modelValue[item.path!] = e
        })
    }
    return h(elName)
}
const visible = (() => {
    const visible = item.visible
    if (typeof visible === 'function') {
        return computed(() => visible(model, modelValue[item.parrentPath || '']))
    }
    return visible ?? true
})()

const rules = (() => {
    const rules = item.rules
    if (typeof rules === 'function') {
        return computed(() => rules(model, modelValue[item.parrentPath || '']))
    }
    return rules
})()

const options = (() => {
    const options = item.props?.options || item.options
    if (typeof options === 'function') {
        return computed(() => options(model, modelValue[item.parrentPath || '']))
    }
    return options
})()

if (item.clearOnHide && typeof visible === 'object') {
    watch(() => visible.value, val => {
        if (!val && item.clearOnHide && item.path) {
            modelValue[item.path] = undefined
        }
    })
}

const getSlot = (slot: unknown, value: unknown) => {
    if (typeof slot !== 'function') {
        return () => slot ?? ''
    }
    const content = slot(value)
    // is vnode
    if (typeof content === 'object') {
        return slot(value)
    }
    return () => content ?? ''
}

</script>
