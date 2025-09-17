<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" ref="child" />
    </router-view>
</template>

<script lang="ts" setup>
</script>
