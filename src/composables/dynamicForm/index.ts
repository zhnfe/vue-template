import { computed, inject, provide, reactive } from 'vue'
import type { DynamicFormData } from '@/types/dynamicForm'
import { get, set } from 'es-toolkit/compat'
import { useInjectId } from '@/utils'

export const dynamicFormIdKey = '_formId'

const useInjectArrayItemId = (obj: AnyObject) => {
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
export const useDynamicFormData = ({ model, config }: DynamicFormData): DynamicFormData => {
    const formData = reactive({
        model: useInjectArrayItemId(model),
        config
    })
    provide('formData', formData)
    return formData
}

export const useInjectFormData = () => {
    return inject<DynamicFormData>('formData')!
}

export const useSetModel = (model: DynamicFormData['model'], data: AnyObject) => {
    Object.assign(model, useInjectArrayItemId(data))
}
export const useModelValue = () => {
    const { model } = useInjectFormData()
    const modelValue = computed({
        get() {
            return new Proxy(model, {
                get(target, key) {
                    return get(target, key)
                },
                set(target, key, value) {
                    return set(target, key, value)
                }
            })
        },
        set() {}
    })
    return { model, modelValue }
}
