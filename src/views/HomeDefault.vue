<template>
    <h1>
        Home Default
        <IconGithub />
    </h1>
    <div>
        <component :is="node" />
    </div>
</template>

<script setup lang="tsx">
import { h } from 'vue'

const node = h('div', 'hahah')
</script>
