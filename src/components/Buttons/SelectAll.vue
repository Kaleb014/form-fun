<script setup lang="ts">
import { useSelectAllStore } from '../../stores/selectAllClicked'

const select_all = useSelectAllStore()
</script>

<template>
  <input @click="select_all.selectAllClicked" type="checkbox" id="selectall" />
</template>
