<script setup lang="ts">
import { ref, onMounted } from "vue";
import { workspaceList } from "../store/useStore";
import ActionButton from "../components/actionButton.vue";

const newWorkspaceName = ref("");
const inputRef = ref(null);

onMounted(() => {
  localStorage.getItem("workspaceList") &&
    (workspaceList.value = JSON.parse(
      localStorage.getItem("workspaceList") as string
    ));
});

function createWorkspace() {
  if (!newWorkspaceName.value) {
    inputRef.value.classList.add("error-class");
    return;
  }
  inputRef.value.classList.remove("error-class");
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
  <div class="flex flex-col justify-center items-center p-4">
    <input
      ref="inputRef"
      type="text"
      class="custom-input"
      placeholder="workspace name..."
      v-model="newWorkspaceName"
      @keyup.enter="createWorkspace()"
    />
    <ActionButton
      text="Create Workspace"
      class="w-fit hover:opacity-50 transition-all"
      @click="createWorkspace"
    />
  </div>
  <ul class="grid grid-cols-4">
    <li
      v-for="workspace in workspaceList"
      :key="workspace.id"
      class="text-white bg-middletonne hover:opacity-50 rounded-lg p-4 m-4 text-center transition-all"
    >
      <nuxt-link :to="'/workspace/' + workspace.id" :workspace="workspace">
        <div class="w-full h-full">
          {{ workspace.name }}
        </div>
      </nuxt-link>
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

.bg-middletonne {
  background-color: #3c8171;
}

.error-class {
  border: solid 3px red;
}
</style>
