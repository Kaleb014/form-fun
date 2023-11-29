<script setup>
import { useMenuStore } from '../../stores/menuClicked'
import { useToolTipsStore } from '../../stores/toolTipsStore'

const tool_tips = useToolTipsStore()
const menu_clicked = useMenuStore()
</script>

<template>
  <button class="tooltip menu_dropdown" type="button" @click="menu_clicked.toggleModal()">
    ≡
    <span class="left-tooltip-text" v-if="tool_tips.useToolTips">Menu</span>
  </button>
</template>

<style scoped>
.left-tooltip-text {
  right: 65px;
}
</style>
