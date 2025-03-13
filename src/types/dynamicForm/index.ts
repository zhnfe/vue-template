import type { FormItemRule } from 'naive-ui'
import type { VNodeChild } from 'vue'
type NaiveEl = 'input' | 'card' | 'switch' | 'rate'
type CustomEl = 'spread' | 'drag'
export type El = NaiveEl | CustomEl | keyof HTMLElementTagNameMap

interface ItemBase {
    span?: number
    el: El
    /** 没有 path 和 label 时, 需要提供一个 v-for 使用的标识 */
    key?: string
    props?: Record<string, unknown>
    visible?(model: Record<string, unknown>): boolean
    slots?: Record<string, VNodeChild | (<T extends never>(scoped: T) => VNodeChild)>
    clearOnHide?: boolean
}

interface FormItem extends ItemBase {
    label?: string
    path?: string
    rules?: FormItemRule | FormItemRule[]
    generateRules?(model: Record<string, any>): void
}
interface NotFormItem extends ItemBase {
    notForm?: true
}
export type DynamicItem = FormItem & NotFormItem

export interface DynamicFormData {
    model: AnyObject
    config: DynamicItem[]
}
