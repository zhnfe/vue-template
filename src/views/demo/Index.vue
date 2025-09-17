<template>
    <pre>{{ formattedValue }}</pre>
    <n-date-picker
        v-model:formatted-value="formattedValue"
        value-format="t"
        type="datetime"
        clearable
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        return {
            formattedValue: ref()
        }
    }
})
</script>
