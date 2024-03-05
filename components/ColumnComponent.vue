<script setup lang="ts">
import draggable from "vuedraggable";
import type { Column, Workspace } from "~/types";
import { workspaceList } from "~/store/useStore";

const props = defineProps<{
  board: { name: string; columns: any };
  createCard: (column: any) => void;
}>();
const drag = ref(false);

function handleDragEnd() {
  drag.value = false;
  workspaceList.value = workspaceList.value.map((w: Workspace) => {
    if (w.name === props.board.name) {
      w.columns = props.board.columns;
    }
    return w;
  });
  localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
}

function removeColumn(column: Column) {
  props.board.columns = props.board.columns.filter(
    (c: Column) => c.id !== column.id
  );
  workspaceList.value = workspaceList.value.map((w: Workspace) => {
    if (w.name === props.board.name) {
      w.columns = props.board.columns;
    }
    return w;
  });
  localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
}
</script>

<template>
  <div class="column-grid gap-2 mx-1">
    <div
      class="h-96 bg-middletonne rounded-lg mx-1"
      v-for="column in board.columns"
      :key="column.name"
    >
      <h2 class="text-center text-2xl text-white">{{ column.name }}</h2>
      <aside class="flex flex-col justify-center">
        <div class="w-full">
          <input
            type="text"
            placeholder="card name"
            class="custom-input w-5/6 mx-2"
            v-model="column.newCardName"
            @keyup.enter="createCard(column)"
          />
          <button class="mx-1" @click="removeColumn(column)">&#10006;</button>
        </div>
        <actionButton text="create Card" @click="createCard(column)" />
      </aside>

      <ul class="mx-3">
        <draggable
          :animation="200"
          ghostClass="moving-card"
          chosenClass="sortable-chosen"
          dragClass="sortable-drag"
          easing="cubic-bezier(0.32, 0, 0.67, 0)"
          class="h-80 bg-middletone rounded-lg p-2 overflow-y-auto"
          v-model="column.cards"
          group="people"
          @start="drag = true"
          @end="handleDragEnd"
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

<style>
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
</style>
