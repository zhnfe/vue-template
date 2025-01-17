import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

const vueConfig = defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended
)
export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
    },
    ...vueConfig,

    {
        rules: {
            semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
            'object-curly-spacing': ['error', 'always'],
            indent: ['error', 4],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'never'],
            'quote-props': ['error', 'as-needed']
        }
    },
    {
        name: 'for vue file',
        files: ['**/*.vue'],
        rules: {
            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 2
                },
                multiline: {
                    max: 1
                }
            }],
            'vue/html-indent': ['error', 4, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }],
            'vue/singleline-html-element-content-newline': 'off'
        }
    }
]
