import type { DynamicFormData } from '@/types/dynamicForm'
import { get, isObject, set } from 'es-toolkit/compat'
import { h, inject, reactive } from 'vue'
import DynamicForm from '@/components/dynamicForm/DynamicForm.vue'
import { useInjectId } from '@/utils'

export const dynamicFormIdKey = '_formId'

/**
 * 递归为数组中的每个元素添加 _formId,
 *  如果需要给 model 添加数组对象, 则调用此方法
 * @example
 * ```js
 *   model.arrayItems = useInjectArrayItemId([...])
 * ```
 */
export function useInjectArrayItemId<T extends AnyObject>(obj: T) {
    if (!isObject(obj)) {
        return obj
    }
    // 如果是数组，为每个元素添加_formId
    if (Array.isArray(obj)) {
        obj.forEach((item) => {
            if (isObject(item)) {
                useInjectId(item, dynamicFormIdKey)
                useInjectArrayItemId(item)
            }
        })
    }
    else {
        for (const key of Object.keys(obj)) {
            useInjectArrayItemId(obj[key])
        }
    }
    return obj
}

const injectModelMap = new Map<symbol, AnyObject>()

/**
 * 使用动态表单数据的自定义 Hook。
 * @param options 动态表单数据对象，包含 `model` 和 `config` 属性。
 * @returns 返回动态表单数据对象，包含 `model`、`config` 和 `updateModel` 方法。
 */
export function useDynamicFormData<T extends AnyObject>(options: DynamicFormData<T> & {
    onSubmit: (data: T) => void
    span?: number
}) {
    const { model, config, onSubmit } = options
    const formData = reactive({
        model: useInjectArrayItemId(model),
        config
    }) as DynamicFormData<T>
    const id = import.meta.env.PROD ? Symbol('dynamicForm') : Symbol(Object.keys(model)[0])
    const dynamicData = {
        ...formData,
        onSubmit,
        span: options.span ?? 24,
        DynamicForm: (props: { message?: string }) => h(DynamicForm, { ...props, id, onVnodeUnmounted() { injectModelMap.delete(id) } })
    }
    injectModelMap.set(id, dynamicData)
    return dynamicData
}

/** 获取 model 和 config */
export function useInjectFormData<T extends AnyObject>(id?: symbol) {
    id ??= inject<symbol>('id')!
    return (injectModelMap.get(id) ?? injectModelMap.values().next().value) as ReturnType<typeof useDynamicFormData<T>>
}

/** 返回 model 的代理, 用于 v-model */
export function useModelValue() {
    const { model } = useInjectFormData()
    const modelValue = new Proxy(model, {
        get(target, key) {
            return get(target, key)
        },
        set(target, key, value) {
            return !!set(target, key, value)
        }
    })
    return { model, modelValue }
}
