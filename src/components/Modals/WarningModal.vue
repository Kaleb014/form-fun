<script setup lang="ts">
import { useWarningStore } from '../../stores/warningStore'
import WarningButton from '../Buttons/WarningButton.vue'

const warning = useWarningStore()
console.log('warning modal active')
</script>

<template>
  <div class="modal">
    <div class="modal-inner">
      <div class="header-row">
        <div class="header-left">Warning!</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="warning.toggleWarningModal()">ⓧ</button>
        </div>
      </div>
      <div class="scrollable">
        <div class="message-container">
          {{ warning.message }}
          <div class="command-container">
            <div class="medium-command-button">
              <WarningButton />
            </div>
          </div>
        </div>
      </div>
      
      <div class="button-container">
        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="warning.toggleWarningModal()">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-inner {
  width: auto;
}
.message-container {
  display: flex;
  align-items: baseline;
}
</style>
