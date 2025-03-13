import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        documentTitle?: string
    }
}

declare global {
    type AnyObject = Record<string, any>
}
export {}
