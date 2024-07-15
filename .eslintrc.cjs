/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:vue/vue3-recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
        'object-curly-spacing': ['error', 'always'],
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        // vue
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
