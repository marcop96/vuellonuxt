<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { workspaceList } from "../../store/useStore";
import type { Workspace } from "../../types";
import actionButton from "../../components/actionButton.vue";
import Column from "../../components/ColumnComponent.vue";
const route = useRoute();
const newColumnName = ref("");

onMounted(() => {
  localStorage.getItem("workspaceList") &&
    (workspaceList.value = JSON.parse(
      localStorage.getItem("workspaceList") as string
    ));
  const foundWorkspace = workspaceList.value.find(
    (w: Workspace) => w.id === Number(route.params.id)
  );
  if (foundWorkspace) {
    board.value = foundWorkspace as Workspace;
  } else {
    console.log("no workspace found");
  }
});

const board = ref({
  name: "board",
  columns: [] as any,
});
const workspace = workspaceList.value.find(
  (w: Workspace) => w.id === Number(route.params.id)
) as Workspace;

function createColumn() {
  if (newColumnName.value) {
    board.value.columns.push({
      name: newColumnName.value,
      cards: [],
    });
    newColumnName.value = "";
    // push new column to worskpaceList

    workspaceList.value = workspaceList.value.map((w: Workspace) => {
      if (w.id === workspace.id) {
        w.columns = board.value.columns;
      }
      return w;
    });
    localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
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
  workspaceList.value = workspaceList.value.map((w) => {
    if (w.id === workspace.id) {
      const boardIndex = w.columns.findIndex(
        (b) => b.name === board.value.name
      );
      if (boardIndex !== -1) {
        w.columns[boardIndex] = board.value.columns;
      }
    }
    return w;
  });
  localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
}

let drag = false;
</script>

<template>
  <h1 class="text-center text-5xl p-3 text-white">
    {{ workspace.name }}
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
  <Column :board="board" :createCard="createCard" v-model:drag="drag" />
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
  border-radius: 4px;
}
.moving-card {
  opacity: 0.5;
}
</style>
