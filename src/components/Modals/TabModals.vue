<script setup lang="ts">
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { useEditFormStore } from '../../stores/editForm'

const field_type = useFieldTypeStore()
const edit = useEditFormStore()
</script>

<template>
  <div v-if="field_type.addTabModalActive">
    <div class="modal">
      <div class="modal-inner modal-width-override">
        <div class="header-row">
          <div class="header-left">New Tab</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddTabModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
            <span>Tab Name : </span>
              <input id="tab-name" type="text" placeholder=" Description..."/>
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.addTab(); field_type.toggleAddTabModal()" > Save </button>
              <button type="button" @click="field_type.toggleAddTabModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="field_type.editTabModalActive">
    <div class="modal">
      <div class="modal-inner modal-width-override">
        <div class="header-row">
          <div class="header-left">Edit Tab: {{ edit.form.tabs[edit.currentTab].name }}</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditTabModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
              <span>Tab Name : </span>
              <input id="tab-name" type="text" :value="edit.form.tabs[edit.currentTab].name" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.editTab()">Save</button>
              <button type="button" @click="field_type.toggleEditTabModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="field_type.deleteTabModalActive">
    <div class="modal">
      <div class="modal-inner modal-width-override">
        <div class="header-row">
          <div class="header-left">Delete Tab(s)</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleDeleteTabModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="tabs-container">
            <span>Tab(s)</span>
            <div class="tab-button" v-for="(tab, index) in edit.form.tabs" :key="index">
              <div class="switch-container">
                <label class="switch">
                  <input class="pointer" type="checkbox" name="tab" :value="index" />
                  <span class="slider"></span>
                </label>
                &emsp;{{ tab.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.deleteTab()">Save</button>
              <button type="button" @click="field_type.toggleDeleteTabModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-width-override {
  max-width: 350px;
}

.row-inner {
  text-align: center;
}

.modal {
  background-color: none;
}

.tabs-container {
  width: 100%;
  font-size: medium;
  color: var(--white);
  white-space: nowrap;
  padding: 5px;
}

.tab-button {
  padding: 2px;
  position: relative;
  left: 25px;
  width: fit-content;
}

span {
  width: 100%;
  font-size: medium;
  color: var(--white);
}


</style>
