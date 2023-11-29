<script setup lang="ts">
import RowOne from '../components/RowOne.vue'
import RowTwo from '../components/RowTwo.vue'
</script>

<template>
  <div class="container">
    <RowOne />
    <RowTwo />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  overflow: hidden;
}
</style>
