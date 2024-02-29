<script setup lang="ts">
const props = defineProps({
  id: Number,
  name: String,
  column: String,
});

console.log(props);
</script>

<template>
  <main class="card-background">
    <p>{{ props.name }}</p>

    <pre>{{ props }}</pre>
  </main>
</template>

<style scoped>
.card-background {
  background-color: #f5f5f5;
  margin-bottom: 4px;
}
</style>
