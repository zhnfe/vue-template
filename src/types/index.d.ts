import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        documentTitle?: string
    }
}

import { DefineComponent } from 'vue'
declare global {
    type AnyObject = Record<any, any>
    type VueComponent = DefineComponent
    declare module '~vic/*' {
        const component: VueComponent
        export default component
    }
    interface HighlightRegistry {
        clear(): void
        delete(key: string): boolean
        has(key: string): boolean
        set(key: string, value: Highlight): void
        get(key: string): Highlight | undefined
        readonly size: number
    }
}
export {}
