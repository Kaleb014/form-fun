<script setup>
import { useAddStore } from '../../stores/addClicked'
import { useToolTipsStore } from '../../stores/toolTipsStore'

const tool_tips = useToolTipsStore()
const add_clicked = useAddStore()
</script>

<template>
  <button class="command-button tooltip" type="button" @click="add_clicked.toggleModal()">
    <img src="../../assets/add-icon-export.png" width="22" height="22" />
    <span class="up-tooltip-text" v-if="tool_tips.useToolTips">Add</span>
  </button>
</template>

<style scoped>
.up-tooltip-text {
  bottom: calc(100% + 4px);
}
</style>
