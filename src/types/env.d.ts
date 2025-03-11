/// <reference types="vite/client" />
/// <reference types="element-plus/global.d.ts" />
interface ImportMetaEnv {
    readonly VITE_DOCUMENT_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
