<script setup lang="ts">
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { useEditFormStore } from '../../stores/editForm'

const field_type = useFieldTypeStore()
const edit = useEditFormStore()
</script>

<template>
  <div v-if="field_type.deleteSectionModalActive">
    <div class="modal">
      <div class="modal-inner">
        <div class="header-row">
          <div class="header-left">Delete Section(s)</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleDeleteSectionModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="sections-container">
            <span>Section(s)</span>
            <div class="section-button" v-for="(section, index) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <div class="switch-container">
                <label class="switch">
                  <input class="pointer" type="checkbox" name="field-section" :value="index" />
                  <span class="slider"></span>
                </label>
                &emsp;Section {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.deleteSection(); field_type.toggleDeleteSectionModal()">Save</button>
              <button type="button" @click="field_type.toggleDeleteSectionModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-inner {
  max-width: 350px;
  max-height: 750px;
}

.modal {
  background-color: none;
}

.section-button {
  padding: 2px;
  position: relative;
  left: 25px;
  width: fit-content;
}

.sections-container {
  width: 100%;
  font-size: medium;
  color: #edf0f1;
  white-space: nowrap;
  padding: 5px;
}

.scrollable {
  display: flex;
}
</style>
../../stores/editForm
