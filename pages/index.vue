<script setup lang="ts">
import { ref } from "vue";
import { workspaceList } from "../store/useStore";
import ActionButton from "../components/actionButton.vue";

const newWorkspaceName = ref("");

onMounted(() => {
  localStorage.getItem("workspaceList") &&
    (workspaceList.value = JSON.parse(
      localStorage.getItem("workspaceList") as string
    ));
});
function createWorkspace() {
  const randomId = Math.floor(Math.random() * 100);

  workspaceList.value.push({
    id: randomId,
    name: newWorkspaceName.value,
    columns: [],
  });
  newWorkspaceName.value = "";
  localStorage.setItem("workspaceList", JSON.stringify(workspaceList.value));
  console.log(workspaceList.value);
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <input
      type="text"
      class="custom-input"
      placeholder="workspace name..."
      v-model="newWorkspaceName"
      @keyup.enter="createWorkspace()"
    />
    <ActionButton
      text="create workspace"
      class="w-fit"
      @click="createWorkspace"
    />
  </div>
  <ul>
    <li
      v-for="workspace in workspaceList"
      :key="workspace.id"
      class="m-2 p-2 text-white border-2 w-72 text-center"
    >
      <nuxt-link
        :to="'/workspace/' + workspace.id"
        :workspace="workspace"
        class="p-2 my-4 block w-full"
      >
        {{ workspace.name }} - {{ workspace.id }}</nuxt-link
      >
    </li>
  </ul>
</template>

<style scoped>
h1 {
  color: white;
  font-size: 36px;
}

input {
  color: #333;
  text-align: center;
  height: 40px;
  width: 360px;
  background-color: #f4f4f4;
  border: 1px solid #333;
  margin: 5px;
  padding: 5px;
  font-size: 0.9rem;
}
</style>
