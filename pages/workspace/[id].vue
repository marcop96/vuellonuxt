<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { workspaceList } from '../../store/useStore'
import type { Workspace } from '../../types'

const route = useRoute()

const workspace = (workspaceList.value.find((w: Workspace) => w.id === Number(route.params.id)) as Workspace)
</script>

<template>
  <h1>{{ workspace.name }} {{ workspace.id }}</h1>
  <p></p>
</template>
