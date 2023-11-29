<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useSearchStore } from '../stores/searchStore'

const search_store = useSearchStore()

onMounted(() => {
  search_store.search = ''
})
</script>

<template>
  <form id="searchbar" class="search_container" autocomplete="off">
    <input type="text" name="search" placeholder=" Search..." v-model="search_store.search" />
  </form>
</template>
