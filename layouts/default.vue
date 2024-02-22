<script setup lang='ts'>
import { ref } from 'vue';

const hello = ref('hello world')
</script>

<template>
  <p>detfault layotu</p>
  <nav>
    <nuxt-link to="/">Home</nuxt-link>
  </nav>
  <slot />
</template>
