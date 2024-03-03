<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { workspaceList } from "../../store/useStore";
import type { Workspace } from "../../types";
import actionButton from "../../components/actionButton.vue";
import CardComponent from "~/components/CardComponent.vue";
import draggable from "vuedraggable";
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
    column.newCardName = "";
  }
}

let drag = false;
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
    <div
      class="h-96 bg-middletonne rounded-sm"
      v-for="column in board.columns"
      :key="column.name"
    >
      <h2 class="text-center">{{ column.name }}</h2>
      <input
        type="text"
        placeholder="card name"
        class="custom-input"
        v-model="column.newCardName"
        @keyup.enter="createCard(column)"
      />
      <actionButton text="create Card" @click="createCard(column)" />

      <ul>
        <draggable
          :animation="200"
          class="h-80"
          v-model="column.cards"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div>
              <CardComponent
                :card="element"
                :column="column.name"
                :columns="board.columns"
              />
            </div>
          </template>
        </draggable>
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
.moving-card {
  opacity: 0.5;
}
</style>
