import type { VNodeChild } from 'vue'
type NaiveEl = 'input' | 'card' | 'switch' | 'rate'
type CustomEl = 'spread' | 'drag'
export type El = NaiveEl | CustomEl | keyof HTMLElementTagNameMap

interface ItemBase {
    span?: number
    el: El
    props?: Record<string, unknown>
    visible?(model: Record<string, unknown>): boolean
    slots?: Record<string, VNodeChild | (<T extends never>(scoped: T) => VNodeChild)>
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
