<script setup>
import { useEditStore } from '../../stores/editClicked'
import { useToolTipsStore } from '../../stores/toolTipsStore'

const tool_tips = useToolTipsStore()
const edit_clicked = useEditStore()
</script>

<template>
  <button class="command-button tooltip" type="button" @click="edit_clicked.toggleAction()">
    <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
    <span class="up-tooltip-text" v-if="tool_tips.useToolTips">Edit</span>
  </button>
</template>

<style scoped>
.up-tooltip-text {
  bottom: calc(100% + 4px);
}
</style>
