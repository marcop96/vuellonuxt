<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { workspaceList } from '../../store/useStore'
import type { Workspace } from '../../types'

const route = useRoute()
const newBoardName = ref('')
const board = ref({
  name: 'test',
  columns: []
});
const workspace = (workspaceList.value.find((w: Workspace) => w.id === Number(route.params.id)) as Workspace)

function createColumn() {
  board.value.columns.push({
    name: newBoardName.value
  })
  newBoardName.value = ''
}
</script>

<template>
  <h1>{{ workspace.name }} {{ workspace.id }}</h1>
  <section>
    <div class="column-grid grid grid-cols-4">

    </div>
    <!-- <input type="text" v-model="newBoardName" />
    <button @click="createColumn" class="bg-red-500 rounded-lg">Create Column</button> -->
  </section>
</template>
