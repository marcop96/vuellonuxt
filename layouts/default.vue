<script setup lang="ts">
import { ref } from "vue";

useHead({
  title: "TrelloNuxt",
});
</script>

<template>
  <div class="container">
    <header class="main-header">
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
      </nav>
    </header>
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>
<style>
.main-header {
  background-color: #42b883;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.main-content {
  background-color: #35495e;
  height: 100vh;
}
.container {
  min-width: 100%;
}
</style>
