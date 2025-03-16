/// <reference types="vite/client" />
/// <reference types="naive-ui/volar.d.ts" />
interface ImportMetaEnv {
    readonly VITE_DOCUMENT_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
