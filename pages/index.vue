<script setup lang='ts'>
import { ref } from 'vue';
import { workspaceList } from '../store/useStore';
import ActionButton from '../components/actionButton.vue';



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
  <h1>VUELLO</h1>
  <h2>recently viewed
  </h2>
  <h2>workspaces</h2>
  <input type="text" class="custom-input" placeholder="workspace name..." v-model="newWorkspaceName"
    @keyup.enter="createWorkspace()" />
  <ActionButton text="create workspace" @click="createWorkspace" />
  <ul>
    <li v-for="workspace in workspaceList" :key='workspace.id' class="m-2 p-2 text-white border-2 block text-center">
      <nuxt-link :to="'/workspace/' + workspace.id" :workspace="workspace" class="p-2 my-4 block w-full">
        {{ workspace.name }} - {{ workspace.id }}</nuxt-link>

    </li>
  </ul>
</template>

<style scoped> h1 {
   color: white;
   font-size: 36px;
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
