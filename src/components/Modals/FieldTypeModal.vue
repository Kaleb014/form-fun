<script setup lang="ts">
import { onUnmounted } from 'vue'
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
// TODO: Make different field types actually different...
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
            <div class="field-button" v-for="(section, index) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <label class="switch">
                <input type="radio" name="field-section" :value="index"/>
                <span class="slider"></span>
              </label>
              <span>&emsp;Section {{ index + 1 }}</span>
              <!--<input class="pointer" type="radio" name="field-section" :value="index"/>&emsp;Section {{ index+1 }}-->
            </div>
          </div>
          <!-- TODO: Create a data structure that stores the below values, then create elements by looping, like I did with Sections -->
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

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.setFieldProperties()">Next</button>
              <button type="button" @click="field_type.toggleAddModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newText">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Text</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." />
              <input id="text" type="text" placeholder=" Value..." />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveNewField(); field_type.toggleAddModal()">Save</button>
              <button type="button" @click="field_type.toggleAddModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newNumber">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Number</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddModal(); edit.closeInputModals()"
            >ⓧ</button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." />
              <input id="text" type="text" placeholder=" Value..." />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveNewField(); field_type.toggleAddModal()">Save</button>
              <button type="button" @click="field_type.toggleAddModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newItem">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Item</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." />
              <input id="text" type="text" placeholder=" Value..." />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveNewField(); field_type.toggleAddModal()">Save</button>
              <button type="button" @click="field_type.toggleAddModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newFormula">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Formula</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleAddModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." />
              <input id="text" type="text" placeholder=" Value..." />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveNewField(); field_type.toggleAddModal()">Save</button>
              <button type="button" @click="field_type.toggleAddModal(); edit.closeInputModals()">Cancel</button>
            </div>
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
            <div class="field-button" v-for="(section, index) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <label class="switch">
                <input type="radio" name="field-section" v-model="currentField.section" />
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

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.setFieldProperties()">Next</button>
              <button type="button" @click="field_type.toggleEditModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="edit.newText">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: Text</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." :value="currentField.description"/>
              <input id="text" type="text" placeholder=" Value..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveEditedField()">Save</button>
              <button type="button" @click="field_type.toggleEditModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newNumber">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: Number</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." :value="currentField.description"/>
              <input id="text" type="text" placeholder=" Value..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveEditedField()">Save</button>
              <button type="button" @click="field_type.toggleEditModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newItem">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: Item</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." :value="currentField.description"/>
              <input id="text" type="text" placeholder=" Value..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveEditedField()">Save</button>
              <button type="button" @click="field_type.toggleEditModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="edit.newFormula">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">Edit Field: Formula</div>

          <div class="header-right">
            <button type="button" class="exit-button" @click="field_type.toggleEditModal(); edit.closeInputModals()">
              ⓧ
            </button>
          </div>
        </div>

        <div class="scrollable">
          <div class="row">
            <div class="row-inner-override">
              <input id="description" type="text" placeholder=" Description..." :value="currentField.description"/>
              <input id="text" type="text" placeholder=" Value..." :value="currentField.value" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="edit.saveEditedField()">Save</button>
              <button type="button" @click="field_type.toggleEditModal(); edit.closeInputModals()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.modal {
  background-color: none;
}

.type-modal-inner {
  max-width: 250px;
}

.row-inner-override {
  text-align: center;
}

.field-button {
  padding: 2px;
  display: flex;
  align-items: center;
  margin-left: 25px;
}

.field-type-buttons-container {
  width: 100%;
  font-size: medium;
  color: #edf0f1;
  white-space: nowrap;
}

.scrollable {
  display: flex;
}


</style>