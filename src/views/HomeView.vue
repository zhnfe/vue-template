<template>
    <header
        style="height: var(--home-header-height);"
        class="border-b border-blue-50 bg-white fixed w-full top-0 z-20"
    />
    <main class="fixed top-(--home-header-height) bottom-0 w-full flex">
        <home-menu />
        <div class="flex-auto overflow-auto p-4 pl-6 router-view">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
import HomeMenu from '@/components/HomeMenu.vue'

</script>
