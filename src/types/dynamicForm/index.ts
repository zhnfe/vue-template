import type { FormItemRule } from 'naive-ui'
import type { Component, VNode, VNodeChild } from 'vue'
type NaiveEl = 'input' | 'card' | 'switch' | 'rate' | 'number' | 'date' | 'ratio' | 'select' | 'checkbox'
type CustomEl = 'spread' | 'drag' | 'group'
export type El = NaiveEl | CustomEl | keyof HTMLElementTagNameMap

export interface DynamicItem<T extends AnyObject = AnyObject> {
    span?: number
    el: El | VNode | Component
    /** 没有 path 和 label 时, 需要提供一个 v-for 使用的标识 */
    key?: string
    /** 给组件的 props, 通过 v-bind 全部传递 */
    props?: Record<string, unknown>
    visible?<U extends AnyObject = AnyObject>(model: T, currentModel: U): boolean
    slots?: Record<string, VNodeChild | (<T extends never>(scoped: T) => VNodeChild)>
    clearOnHide?: boolean
    children?: DynamicItem<T>[]

    // 表单项
    label?: string
    path?: string
    // 当前表单项父级路径
    parrentPath?: string
    rules?: FormItemRule | FormItemRule[] | (<U extends AnyObject = AnyObject>(model: T, parentModel: U) => FormItemRule | FormItemRule[])

    /** 数组项初始值 */
    initialValue?: AnyObject

    options?: Array<{ label: string, value: any }> | ((<U extends AnyObject = AnyObject>(model: T, parentModel: U) => Array<{ label: string, value: any }>))
    // props
    [key: string]: unknown
}

export interface DynamicFormData<T extends AnyObject> {
    model: T
    config: DynamicItem<T>[]
}
