<script setup>
import { useDeleteStore } from '../../stores/deleteClicked'

const delete_clicked = useDeleteStore()
</script>

<template>
  <div class="modal" v-if="delete_clicked.deleteModalActive">
    <div class="modal-inner" v-if="delete_clicked.deleteModalActive">
      <div class="header-row">
        <div class="header-left">Delete Confirmation</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="delete_clicked.toggleModal()">ⓧ</button>
        </div>
      </div>
      <div class="scrollable">
        <p>Are you sure you want to delete the selected item(s)?</p>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="delete_clicked.toggleModalWait()">Yes</button>
            <button type="button" @click="delete_clicked.toggleModal()">No</button>
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
</style>
