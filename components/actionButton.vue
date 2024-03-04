<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  text: String,
  color: String,
});
</script>

<template>
  <button class="bg-red-500 rounded-lg p-2 m-2">
    {{ props.text }}
  </button>
</template>
