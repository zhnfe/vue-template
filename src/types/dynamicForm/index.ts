import type { VNode } from 'vue'
import {} from 'element-plus'
type ElementEl = 'input' | 'card' | 'switch'
type CustomEl = 'spread'
export type El = ElementEl | CustomEl | keyof HTMLElementTagNameMap

interface ItemBase {
    span?: number
    el: El
    props?: Record<string, unknown>
    visible?(model: Record<string, unknown>): boolean
    slot?: string | number | ((...args: unknown[]) => VNode)
    key?: string
}

interface FormItem extends ItemBase {
    label?: string
    prop?: string
    rules?: object | object[]
    clearOnHide?: boolean
}
interface NotFormItem extends ItemBase {
    notForm?: true
}
export type DynamicItem = FormItem & NotFormItem

export interface DynamicFormData {
    model: Record<string, unknown>
    config: DynamicItem[]
}
