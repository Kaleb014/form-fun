<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { useEditFormStore } from '../../stores/editForm'

const field_type = useFieldTypeStore()
const edit = useEditFormStore()
const currentField =
  edit.form.tabs[edit.currentTab].sections[edit.currentSection].fields[edit.currentField]
const currentSection = edit.form.tabs[edit.currentTab].sections[edit.currentSection]

onUnmounted(() => {
  edit.clearFieldTypeVariables()
})
</script>

<template>
  <div v-if="field_type.addFieldTypeModalActive">
    <div class="modal" v-if="edit.getFieldProperties">
      <div class="modal-inner">
        <div class="header-row">
          <div class="header-left">New Field</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="field-type-buttons-container">
            <span>Section</span>
            <div
              class="field-button"
              v-for="(section, index) in edit.form.tabs[edit.currentTab].sections"
              :key="section"
            >
              <label class="switch">
                <input type="radio" name="field-section" :value="index" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Section {{ index + 1 }}</span>
              <!--<input class="pointer" type="radio" name="field-section" :value="index"/>&emsp;Section {{ index+1 }}-->
            </div>
          </div>

          <div class="field-type-buttons-container">
            <span>Alignment</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Left" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Left</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Left-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Left-tabbed</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Center" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Center</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Center-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Center-tabbed</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Right" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Right</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Right-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Right-tabbed</span>
            </div>
          </div>

          <div class="field-type-buttons-container">
            <span>Field Type</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Text" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Text</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Number" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Number</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Item" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Item</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Formula" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Formula</span>
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="edit.setFieldProperties()">Next</button>
            <button type="button" @click="field_type.toggleAddModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newText">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Text</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
              <input id="description" type="text" placeholder="Description..." />
              <span> : </span>
              <input id="text" type="text" placeholder="Type here..." />
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="edit.saveNewField(); field_type.toggleAddModal()"
            >Save</button>
            <button
              type="button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newNumber">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Number</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >ⓧ</button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
              <input id="description" type="text" placeholder="Description..." />
              <span> : </span>
              <input id="text" type="text" placeholder="Type here..." />
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="edit.saveNewField(); field_type.toggleAddModal()"
            >
              Save
            </button>
            <button
              type="button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newItem">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Item</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <span>Item</span>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="edit.saveNewField(); field_type.toggleAddModal()"
            >
              Save
            </button>
            <button
              type="button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newFormula">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Formula</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <span>Formula</span>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="edit.saveNewField(); field_type.toggleAddModal()"
            >
              Save
            </button>
            <button
              type="button"
              @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="field_type.editFieldTypeModalActive">
    <div class="modal" v-if="edit.getFieldProperties">
      <div class="modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: {{ currentField.description }}</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditModal()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="field-type-buttons-container">
            <span>Section</span>
            <div
              class="field-button"
              v-for="(section, index) in edit.form.tabs[edit.currentTab].sections"
              :key="section"
            >
              <label class="switch">
                <input type="radio" name="field-section" :value="index" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Section {{ index + 1 }}</span>
              <!--<input class="pointer" type="radio" name="field-section" :value="index"/>&emsp;Section {{ index+1 }}-->
            </div>
          </div>

          <div class="field-type-buttons-container">
            <span>Alignment</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Left" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Left</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Left-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Left-tabbed</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Center" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Center</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Center-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Center-tabbed</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Right" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Right</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-alignment" value="Right-tabbed" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Right-tabbed</span>
            </div>
          </div>

          <div class="field-type-buttons-container">
            <span>Field Type</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Text" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Text</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Number" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Number</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Item" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Item</span>
            </div>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Formula" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Formula</span>
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="edit.setFieldProperties()">Next</button>
            <button type="button" @click="field_type.toggleEditModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newText">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: {{ currentField.description }}</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
              <input
                id="description"
                type="text"
                placeholder="Description..."
                :value="currentField.description"
              />
              <span> : </span>
              <input id="text" type="text" placeholder="Type here..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="edit.saveEditedField()">Save</button>
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newNumber">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: {{ currentField.description }}</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner">
              <input
                id="description"
                type="text"
                placeholder="Description..."
                :value="currentField.description"
              />
              <span> : </span>
              <input id="text" type="text" placeholder="Type here..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button type="button" @click="edit.saveEditedField()">Save</button>
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newItem">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Item</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <span>Item</span>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Save
            </button>
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newFormula">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Formula</div>

          <div class="header-right">
            <button
              type="button"
              class="exit-button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <span>Formula</span>
        </div>

        <div class="small-body-button">
          <div class="modal_lower_button">
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Save
            </button>
            <button
              type="button"
              @click="field_type.toggleEditModal(); edit.closeInputModals()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-inner {
  width: 500px;
  height: 500px;
}

.modal {
  background-color: none;
}

.type-modal-inner {
  width: auto;
  height: auto;
}

.field-button {
  padding: 2px;
  display: flex;
  vertical-align: middle;
  align-items: center;
}

.field-type-buttons-container {
  width: 100%;
  display: block;
  justify-content: left;
  font-size: medium;
  color: #edf0f1;
  white-space: nowrap;
  padding: 5px;
}

.scrollable {
  display: flex;
}

.switch {
  position: relative;
  display: flex;
  width: 24px;
  min-width: 24px;
  height: 14px;
  margin: 0 2px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1a1b1f;
  transition: 0.4s;
  border-radius: 34px;
}

input[type='radio'] {
  display: none;
}

.slider::before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  left: 1px;
  bottom: 1px;
  background-color: #5f616d;
  transition: 0.4s;
  border-radius: 50px;
}

input:checked + .slider {
  background-color: #5f616d;
}

input:checked + .slider::before {
  transform: translate(10px);
  background-color: #c7c9ca;
}
</style>
../../stores/editForm
