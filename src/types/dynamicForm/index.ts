import type { FormItemRule } from 'naive-ui'
import type { VNodeChild } from 'vue'
type NaiveEl = 'input' | 'card' | 'switch' | 'rate'
type CustomEl = 'spread' | 'drag' | 'group'
export type El = NaiveEl | CustomEl | keyof HTMLElementTagNameMap

export interface DynamicItem<T extends AnyObject = AnyObject> {
    span?: number
    el: El
    /** 没有 path 和 label 时, 需要提供一个 v-for 使用的标识 */
    key?: string
    /** 给组件的 props, 通过 v-bind 全部传递 */
    props?: Record<string, unknown>
    visible?(model: T): boolean
    slots?: Record<string, VNodeChild | (<T extends never>(scoped: T) => VNodeChild)>
    clearOnHide?: boolean
    children?: DynamicItem<T>[]

    // 表单项
    label?: string
    path?: string
    rules?: FormItemRule | FormItemRule[]
    generateRules?(model: T): void

    // 非表单项组件
    notForm?: boolean
    title?: string

    /** 数组项初始值 */
    initialValue?: AnyObject
}

export interface DynamicFormData<T extends AnyObject> {
    model: T
    config: DynamicItem<T>[]
}
