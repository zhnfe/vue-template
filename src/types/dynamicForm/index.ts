import type { FormItemRule } from 'naive-ui'
import type { VNodeChild } from 'vue'
type NaiveEl = 'input' | 'card' | 'switch' | 'rate'
type CustomEl = 'spread' | 'drag' | 'group'
export type El = NaiveEl | CustomEl | keyof HTMLElementTagNameMap

interface ItemBase {
    span?: number
    el: El
    /** 没有 path 和 label 时, 需要提供一个 v-for 使用的标识 */
    key?: string
    /** 给组件的 props, 通过 v-bind 全部传递 */
    props?: Record<string, unknown>
    visible?(model: AnyObject): boolean
    slots?: Record<string, VNodeChild | (<T extends never>(scoped: T) => VNodeChild)>
    clearOnHide?: boolean
    children?: DynamicItem[]
}

interface FormItem extends ItemBase {
    label?: string
    path?: string
    rules?: FormItemRule | FormItemRule[]
    generateRules?(model: Record<string, any>): void
}
interface NotFormItem extends ItemBase {
    notForm?: true
    title?: string
}
export type DynamicItem = FormItem & NotFormItem

export interface DynamicFormData {
    model: AnyObject
    config: DynamicItem[]
}
