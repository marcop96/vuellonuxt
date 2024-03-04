<script setup lang="ts">
import { workspaceList } from "~/store/useStore";
import type { Card, Column } from "../types";

const props = defineProps({
  card: {
    type: Object as () => Card,
    required: true,
  },
  column: {
    type: String,
    required: true,
  },
  columns: {
    type: Array as () => Column[],
    required: true,
  },
});

function deleteCard() {
  const column = props.columns.find((c) => c.name === props.column);
  if (!column) return;
  column.cards = column.cards.filter((c) => c.id !== props.card.id);

  localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
}
</script>

<template>
  <main class="card-background">
    <p class="text-center p-2" @dblclick="deleteCard()">{{ card.name }}</p>
  </main>
</template>

<style scoped>
.card-background {
  background-color: #f5f5f5;
  margin-bottom: 4px;
  border-radius: 4px;
}
</style>
