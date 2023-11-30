<script setup lang="ts">
import { useSaveStore } from '../../stores/saveClicked'

const already_exists = useSaveStore()
</script>

<template>
  <div class="modal" v-if="already_exists.alreadyExistsModalActive">
    <div class="modal-inner" v-if="already_exists.alreadyExistsModalActive">
      <div class="header-row">
        <div class="header-left">{{ already_exists.uppercaseItem }} Already Exists!</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="already_exists.toggleModal()">ⓧ</button>
        </div>
      </div>

      <div class="scrollable">
        <span>
          {{ already_exists.aOrAn }} {{ already_exists.lowercaseItem }} with the same name already
          exists, please enter a unique name and try again.
        </span>
      </div>

      <div class="button-container">
        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="already_exists.toggleModal()">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>