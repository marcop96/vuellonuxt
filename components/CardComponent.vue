<script setup lang="ts">
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

// function moveCard(id: Number, currentColumn: any, newColumn: String) {
//   const card = props.columns
//     .find((column: Column) => column.cards.find((card: Card) => card.id === id))
//     ?.cards.find((card: Card) => card.id === id);

//   const targetColumn = props.columns.find(
//     (column: Column) => column.name === newColumn
//   );

//   // if the target column exists, add the card to it
//   if (targetColumn) {
//     targetColumn.cards.push(card as Card);
//     // remove the card from the current column
//     const findCurrentColumn = props.columns.find(
//       (column: Column) => column.name === currentColumn
//     );
//     console.log(currentColumn);
//     currentColumn.cards.splice(
//       currentColumn.cards.findIndex((card: Card) => card.id === id),
//       1
//     );
//   }
// }
</script>

<template>
  <main class="card-background">
    {{ card.name }}
  </main>
</template>

<style scoped>
.card-background {
  background-color: #f5f5f5;
  margin-bottom: 4px;
}
</style>
