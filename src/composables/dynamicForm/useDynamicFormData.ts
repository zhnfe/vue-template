import { computed, inject, provide, reactive } from 'vue'
import type { DynamicFormData } from '@/types/dynamicForm'
import { get, set } from 'es-toolkit/compat'

export const useDynamicFormData = (data: DynamicFormData) => {
    const formData = reactive({ model: data.model, config: data.config })
    provide('formData', formData)
    return formData
}

export const useInjectFormData = () => {
    return inject<DynamicFormData>('formData')!
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
