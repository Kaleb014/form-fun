<script setup>
import { useToolTipsStore } from '../../stores/toolTipsStore'
import { useWarningStore } from '../../stores/warningStore'

const tool_tips = useToolTipsStore()
const warning = useWarningStore()
</script>

<template>
  <button class="command-button tooltip" type="button">
    <img src="../../assets/info-circle-line-icon-export.png" width="22" height="22" />
    <span class="left-tooltip-text" v-if="tool_tips.useToolTips">{{ warning.header }}</span>
  </button>
</template>

<style scoped>
.left-tooltip-text {
  right: 56px;
  white-space: pre-wrap;
}
</style>
