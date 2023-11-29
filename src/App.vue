<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
import ModalView from './views/ModalView.vue'
</script>

<template>
  <HeaderView />

  <RouterView />

  <ModalView />
</template>
