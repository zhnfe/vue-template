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
    type Nil = null | undefined
    declare module '~vic/*' {
        const component: VueComponent
        export default component
    }
}
export {}
