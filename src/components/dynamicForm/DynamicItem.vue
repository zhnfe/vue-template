<template>
    <template
        v-if="visible"
    >
        <el-form-item
            v-if="item.prop && !item.notForm"
            :style="{gridColumn: `span ${item.span ?? 12}`}"
            :prop="item.prop"
            :label="item.label"
            :rules="item.rules"
        >
            <component
                :is="components[item.el] ?? item.el"
                v-bind="item.props"
                v-model="modelValue[item.prop!]"
            >
                <template v-if="typeof item.slot === 'function'">
                    <component
                        :is="item.slot(item, modelValue)"
                    />
                </template>
                <template v-else>
                    {{ item.slot }}
                </template>
            </component>
        </el-form-item>
        <component
            v-else
            :style="{gridColumn: `span ${item.span ?? 12}`}"
            :is="components[item.el] ?? item.el"
            v-bind="item.props"
            v-model="modelValue[item.prop!]"
            :prop="item.prop"
        >
            <template v-if="typeof item.slot === 'function'">
                <component
                    :is="item.slot(item, modelValue)"
                    v-bind="item.props"
                />
            </template>
            <template v-else>
                {{ item.slot }}
            </template>
        </component>
    </template>
</template>

<script lang="ts" setup>
import { useModelValue } from '@/composables/dynamicForm/useDynamicFormData'
import type { DynamicItem, El } from '@/types/dynamicForm'
import { ElCard, ElInput, ElSelect, ElSwitch } from 'element-plus'
import { computed, watch, type ComputedRef } from 'vue'
import SpreadItem from './SpreadItem.vue'

// elCard 的类型
const components: Partial<Record<El, unknown>> = {
    input: ElInput,
    card: ElCard,
    select: ElSelect,
    switch: ElSwitch,
    spread: SpreadItem
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
            modelValue.value[props.item.prop!] = undefined
        }
    })
}
</script>
