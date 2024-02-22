<script setup lang='ts'>
import { ref } from 'vue';
interface Workspace {
  id: number;
  name: string;
}
const workspaceList = ref<Workspace[]>([])
const newWorkspaceName = ref('');

function createWorkspace() {
  const randomId = Math.floor(Math.random() * 100);

  workspaceList.value.push({
    id: randomId,
    name: newWorkspaceName.value,
  });
  newWorkspaceName.value = '';
}

</script>

<template>
  <h1>HOME PAGE</h1>
  <h2>recently viewed</h2>
  <h2>workspaces</h2>
  <input type="text" v-model="newWorkspaceName" @keyup.enter="createWorkspace()" />
  <button @click="createWorkspace">create a worskpace</button>
  <ul>
    <li v-for="workspace in workspaceList" :key='workspace.id'>
      {{ workspace.name }} - {{ workspace.id }}

    </li>
  </ul>
</template>
