<script setup>
import { useCopyStore } from '../../stores/copyClicked'
import { useToolTipsStore } from '../../stores/toolTipsStore'

const tool_tips = useToolTipsStore()
const copy_clicked = useCopyStore()
</script>

<template>
  <button class="command-button tooltip" type="button" @click="copy_clicked.toggleAction()">
    <img src="../../assets/copy-outline-icon-export-export.png" width="18" height="22" />
    <span class="up-tooltip-text" v-if="tool_tips.useToolTips">Duplicate</span>
  </button>
</template>

<style scoped>
.up-tooltip-text {
  bottom: calc(100% + 4px);
}
</style>
