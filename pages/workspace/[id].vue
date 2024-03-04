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

onMounted(() => {
  if (localStorage.getItem("board")) {
    board.value = JSON.parse(localStorage.getItem("board"));
  }
  if (localStorage.getItem("cards")) {
    board.value.columns.cards = JSON.parse(localStorage.getItem("cards"));
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
      newCardName: "",
      name: newColumnName.value,
      cards: [],
    });
    newColumnName.value = "";
  } else {
    console.log("no name");
  }
  localStorage.setItem("board", JSON.stringify(board.value));
}

function createCard(column: any) {
  if (column.newCardName) {
    column.cards.push({
      id: Math.random(),
      name: column.newCardName,
    });
    column.newCardName = "";

    localStorage.setItem("cards", JSON.stringify(column.cards));
  }
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
  <div class="column-grid gap-2 mx-1">
    <div
      class="h-96 bg-middletonne rounded-lg mx-1"
      v-for="column in board.columns"
      :key="column.name"
    >
      <h2 class="text-center text-2xl text-white">{{ column.name }}</h2>
      <aside class="flex flex-col justify-center">
        <input
          type="text"
          placeholder="card name"
          class="custom-input"
          v-model="column.newCardName"
          @keyup.enter="createCard(column)"
        />
        <actionButton text="create Card" @click="createCard(column)" />
      </aside>

      <ul class="mx-3">
        <draggable
          :animation="200"
          ghostClass="moving-card"
          chosenClass="sortable-chosen"
          dragClass="sortable-drag"
          easing="cubic-bezier(0.32, 0, 0.67, 0)"
          class="h-80"
          v-model="column.cards"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
          :remove-element="true"
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
  border-radius: 4px;
}
.moving-card {
  opacity: 0.5;
}
</style>
