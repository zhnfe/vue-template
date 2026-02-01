import type { Ref } from 'vue'
import Sortable from 'sortablejs'
import { onMounted, watch } from 'vue'

export function useSortable(
    sortOptions: Sortable.Options & { selector: string | Ref<HTMLElement | Nil> },
    observeOptions: { [K in keyof Sortable.Options]?: () => Sortable.Options[K] } = {}
) {
    const sortable: { value?: Sortable } = {}
    const { selector, ...otherOptions } = sortOptions
    const options: Sortable.Options = {
        animation: 150,
        fallbackOnBody: true,
        disabled: false,
        ...otherOptions
    }

    for (const [key, value] of Object.entries(observeOptions)) {
        watch(value, (newVal) => {
            sortable.value?.option(key as keyof Sortable.Options, newVal)
        })
    }

    onMounted(() => {
        const el = typeof selector === 'string'
            ? document.querySelector<HTMLElement>(selector)
            : selector.value
        if (!el) {
            return
        }
        sortable.value = new Sortable(el, options)
    })

    return { sortable }
}
