<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { workspaceList } from '../../store/useStore'
import type { Workspace } from '../../types'

const route = useRoute()
const newColumnName = ref('')

const board = ref({
  name: 'test',
  columns: [] as any
});
const workspace = (workspaceList.value.find((w: Workspace) => w.id === Number(route.params.id)) as Workspace)

function createColumn() {
  if (newColumnName.value) {
    board.value.columns.push({
      newCardName: '',
      name: newColumnName.value,
      cards: []
    })
    newColumnName.value = ''
  }
  else { console.log(('no name')) }
}

function createCard(column: any) {
  if (column.newCardName) {

    (column.cards.push({
      id: Math.random(),
      name: column.newCardName
    }))
  }
  column.newCardName = ''
}


</script>

<template>
  <h1 class="text-center text-5xl">{{ workspace.name }} - {{ workspace.id }}</h1>
  <section>
    <input type="text" class="border border-2  p-2 mx-2" v-model="newColumnName" @keyup.enter="createColumn" />
    <button @click="createColumn" class="bg-red-500 rounded-lg">Create Column</button>
  </section>
  <div class="column-grid gap-2 mx-1 ">
    <div class="h-96 bg-gray-500 rounded-sm" v-for="column in board.columns">
      <h2 class='text-center'>{{ column.name }}</h2>
      <input type="text" class="border border-2  p-2 mx-2" v-model="column.newCardName"
        @keyup.enter="createCard(column)" />
      <button @click="createCard(column)" class="bg-red-500 rounded-lg">Create Card</button>

      <ul>
        <li v-for="card in column.cards">
          {{ card.name }}</li>
      </ul>
    </div>

  </div>
</template>
<style scoped> .column-grid {
   display: grid;
   grid-template-columns: repeat(v-bind(board.columns.length), 1fr)
 }
</style>
