<script setup>
import { useDeleteStore } from '../../stores/deleteClicked'
import { useToolTipsStore } from '../../stores/toolTipsStore'

const tool_tips = useToolTipsStore()
const delete_clicked = useDeleteStore()
</script>

<template>
  <button class="command-button tooltip" type="button" @click="delete_clicked.toggleAction()">
    <img src="../../assets/delete-icon-export.png" width="18" height="22" />
    <span class="up-tooltip-text" v-if="tool_tips.useToolTips">Delete</span>
  </button>
</template>

<style scoped>
.up-tooltip-text {
  bottom: calc(100% + 4px);
}
</style>
