<script setup lang="ts">
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { useEditFormStore } from '../../stores/editForm'

const field_type = useFieldTypeStore()
const edit = useEditFormStore()
</script>
<!-- TODO: Finish wiring this up -->
<template>
  <div v-if="field_type.deleteColumnModalActive">
    <div class="modal">
      <div class="modal-inner">
        <div class="header-row">
          <div class="header-left">Delete Column(s)</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleDeleteColumnModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="sections-container">
            <span>Column(s)</span>
            <div class="section-button" v-for="(section, index) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <div class="switch-container">
                <label class="switch">
                  <input class="pointer" type="checkbox" name="section-choice" :value="index" />
                  <span class="slider"></span>
                </label>
                &emsp;Column {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.deleteColumn(); field_type.toggleDeleteColumnModal()">Save</button>
              <button type="button" @click="field_type.toggleDeleteColumnModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="field_type.addColumnModalActive">
    <div class="modal">
      <div class="modal-inner">
        <div class="header-row">
          <div class="header-left">Add Column(s)</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddColumnModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="sections-container">
            <span>Column(s)</span>
            <div class="section-button" v-for="(section, index) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <div class="switch-container">
                <label class="switch">
                  <input class="pointer" type="checkbox" name="section-choice" :value="index" />
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
              <button type="button" @click="edit.getSelectedSection()">Save</button>
              <button type="button" @click="field_type.toggleAddColumnModal()">Cancel</button>
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
