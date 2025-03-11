<template>
    <input
        type="text"
        v-model="model"
        class="border border-amber-400"
    >
</template>

<script lang="ts" setup>
const model = defineModel<string>()

</script>
