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
    declare module 'virtual:icon-components/*.vue' {
        const component: VueComponent
        export default component
    }
}
export {}
