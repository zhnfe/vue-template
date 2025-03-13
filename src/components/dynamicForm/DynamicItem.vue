<template>
    <template v-if="visible">
        <n-form-item
            v-if="item.path && !item.notForm"
            :style="{gridColumn: `span ${item.span ?? defaultSapn}`}"
            :path="item.path"
            :label="item.label"
            :rule="item.rules"
        >
            <component
                :is="components[item.el] ?? item.el"
                v-bind="item.props"
                v-model:value="modelValue[item.path!]"
            >
                <template
                    v-for="slot, key in item.slots"
                    :key="key"
                    #[key]="values"
                >
                    <component
                        :is="getSlotContent(slot, values)"
                    />
                </template>
            </component>
        </n-form-item>
        <component
            v-else
            v-model="modelValue[item.path!]"
            v-bind="item.props"
            :style="{gridColumn: `span ${item.span ?? defaultSapn}`}"
            :is="components[item.el] ?? item.el"
            :path="item.path"
            :children="item.children"
            :title="item.title"
        >
            <template
                v-for="slot, key in item.slots"
                :key="key"
                #[key]="values"
            >
                <component
                    :is="getSlotContent(slot, values)"
                />
            </template>
        </component>
    </template>
</template>

<script lang="ts" setup>
import { useModelValue } from '@/composables/dynamicForm'
import type { DynamicItem, El } from '@/types/dynamicForm'
import { NInput, NCard, NSelect, NSwitch, NRate } from 'naive-ui'
import { computed, h, watch, type ComputedRef } from 'vue'
import SpreadItem from './SpreadItem.vue'
import DraggableItem from './DraggableItem.vue'
import GroupItem from './GroupItem.vue'

const defaultSapn = 24

const components: Partial<Record<El, unknown>> = {
    input: NInput,
    card: NCard,
    select: NSelect,
    switch: NSwitch,
    rate: NRate,
    spread: SpreadItem,
    drag: DraggableItem,
    group: GroupItem
}
interface Props {
    item: DynamicItem
}

const props = withDefaults(defineProps<Props>(), {})
const { model, modelValue } = useModelValue()
const visible = (() => {
    const visible = props.item.visible
    if (visible === undefined) {
        return true
    }
    return computed(() => {
        return visible(model)
    })
})()
if (props.item.clearOnHide) {
    watch(() => (visible as ComputedRef<boolean>).value, val => {
        if (!val && props.item.clearOnHide) {
            modelValue.value[props.item.path!] = undefined
        }
    })
}
// 给自定义 rules 传入 modelValue
props.item.generateRules?.(modelValue.value)
const getSlotContent = (slot: unknown, value: unknown) => {
    if (typeof slot !== 'function') {
        return h('span', slot ?? '')
    }
    const content = slot(value)
    // is vnode
    if (typeof content === 'object') {
        return slot(value)
    }
    return h('span', content ?? '')
}
</script>
