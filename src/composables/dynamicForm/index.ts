import { computed, inject, provide, reactive } from 'vue'
import type { DynamicFormData } from '@/types/dynamicForm'
import { get, set } from 'es-toolkit/compat'
import { useInjectId } from '@/utils'

export const dynamicFormIdKey = '_formId'

/** 递归为数组中的每个元素添加 _formId,
 *  如果需要给 model 添加数组对象, 则调用此方法
 * @example
 * ```js
 *   model.arrayItems = useInjectArrayItemId([...])
 * ```
*/
export const useInjectArrayItemId = <T>(obj: T) => {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 如果是数组，为每个元素添加_formId
    if (Array.isArray(obj)) {
        obj.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                useInjectId(item, dynamicFormIdKey)
                useInjectArrayItemId(item)
            }
        })
    }
    else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = useInjectArrayItemId(obj[key])
            }
        }
    }
    return obj
}

/**
 * 使用动态表单数据的自定义 Hook。
 * @param param 动态表单数据对象，包含 `model` 和 `config` 属性。
 * @returns 返回动态表单数据对象，包含 `model`、`config` 和 `updateModel` 方法。
 */
export const useDynamicFormData = <T extends AnyObject>({ model, config }: DynamicFormData<T>) => {
    const formData = reactive({
        model: useInjectArrayItemId(model),
        config
    }) as DynamicFormData<T>

    const dynamicData = {
        ...formData,
        updateModel(data: T) {
            Object.assign(formData.model, useInjectArrayItemId(data))
        }
    }
    provide('dynamicData', dynamicData)
    return dynamicData
}

/** 获取 model 和 config */
export const useInjectFormData = <T extends AnyObject>() => {
    return inject<ReturnType<typeof useDynamicFormData<T>>>('dynamicData')!
}

/** 返回 model 的代理, 用于 v-model */
export const useModelValue = () => {
    const { model } = useInjectFormData()
    const modelValue = computed({
        get() {
            return new Proxy(model, {
                get(target, key) {
                    return get(target, key)
                },
                set(target, key, value) {
                    return !!set(target, key, value)
                }
            })
        },
        set() {}
    })
    return { model, modelValue }
}
