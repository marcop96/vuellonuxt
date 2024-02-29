<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { workspaceList } from "../../store/useStore";
import type { Workspace } from "../../types";
import actionButton from "../../components/actionButton.vue";
import CardComponent from "~/components/CardComponent.vue";

const route = useRoute();
const newColumnName = ref("");

const board = ref({
  name: "test",
  columns: [] as any,
});

const workspace = workspaceList.value.find(
  (w: Workspace) => w.id === Number(route.params.id)
) as Workspace;

function createColumn() {
  if (newColumnName.value) {
    board.value.columns.push({
      newCardName: "",
      name: newColumnName.value,
      cards: [],
    });
    newColumnName.value = "";
  } else {
    console.log("no name");
  }
}

function createCard(column: any) {
  if (column.newCardName) {
    column.cards.push({
      id: Math.random(),
      name: column.newCardName,
    });
  }
  column.newCardName = "";
}

function moveCard(id: Number, currentColumn: String, newColumn: String) {
  const card = board.value.columns
    .find((column: string) => column.cards.find((card: any) => card.id === id))
    .cards.find((card: any) => card.id === id);
  const column = board.value.columns.find(
    (column) => column.name === newColumn
  );
  column.cards.push(card);
  board.value.columns
    .find((column) => column.name === currentColumn)
    .cards.splice(
      board.value.columns
        .find((column) => column.name === currentColumn)
        .cards.findIndex((card) => card.id === id),
      1
    );
}
</script>

<template>
  <h1 class="text-center text-5xl p-3 text-white">
    {{ workspace.name }} - {{ workspace.id }}
  </h1>
  <section>
    <input
      type="text"
      placeholder="column name"
      class="custom-input"
      v-model="newColumnName"
      @keyup.enter="createColumn"
    />
    <actionButton text="create Column" @click="createColumn" />
  </section>
  <div class="column-grid gap-2 mx-1">
    <div class="h-96 bg-middletonne rounded-sm" v-for="column in board.columns">
      <h2 class="text-center">{{ column.name }}</h2>
      <input
        type="text"
        placeholder="card name"
        class="custom-input"
        v-model="column.newCardName"
        @keyup.enter="createCard(column)"
      />
      <actionButton text="create Card" @click="createCard(column)" />

      <!-- <ul>
        <CardComponent
          v-for="card in column.cards"
          :key="card.id"
          :name="card.name"
          :id="card.id"
          :column="column.name"
        />
      </ul> -->
      <ul>
        <li
          v-for="card in column.cards"
          :key="card.id"
          style="background-color: white; margin-bottom: 3px"
        >
          <h4 class="text-center">{{ card.name }}</h4>
          <p>move list</p>
          <select
            name="move-list"
            id="first-move-list"
            @change="moveCard(card.id, column.name, $event.target.value)"
          >
            <option v-for="column in board.columns" :key="column.name">
              {{ column.name }}
            </option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.column-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(board.columns.length), 1fr);
}

.bg-middletonne {
  background-color: #3c8171;
}

input {
  color: #333;
  background-color: #f4f4f4;
  border: 1px solid #333;
  margin: 5px;
  padding: 5px;
  font-size: 0.9rem;
}
</style>
