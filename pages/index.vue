<script setup lang='ts'>
import { ref } from 'vue';
import { workspaceList } from '~/store/useStore';



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
      <nuxt-link :to="'/workspace/' + workspace.id" :workspace="workspace">
        {{ workspace.name }} - {{ workspace.id }}</nuxt-link>

    </li>
  </ul>
</template>
