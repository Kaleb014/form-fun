<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { useEditFormStore } from '../../stores/editForm'

const field_type = useFieldTypeStore()
const edit = useEditFormStore()
const currentField =
  edit.form.tabs[edit.currentTab].sections[edit.currentSection].columns[edit.currentColumn].fields[edit.currentField]
const currentSection = edit.form.tabs[edit.currentTab].sections[edit.currentSection]

onUnmounted(() => {
  edit.clearFieldTypeVariables()
})
// TODO: Make different field types actually different...
</script>

<template>
  <div v-if="field_type.addFieldTypeModalActive">
    <div class="modal" v-if="edit.getFieldProperties">
      <div class="modal-inner properties-modal-inner">
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
            <div>
              <div v-for="(section, sectionIndex) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <span>&emsp;Section {{ sectionIndex + 1 }}</span>
                <div>
                <div class="field-button" v-for="(column, columnIndex) in edit.form.tabs[edit.currentTab].sections[sectionIndex].columns" :key="column">
                  <label class="switch">
                    <input type="radio" name="field-column" :value="columnIndex"/>
                    <span class="slider"></span>
                  </label>
                  <span>&emsp;Column {{ columnIndex + 1 }}</span>
                </div>
              </div>
            </div>
            </div>
          </div>
          
          <div class="field-type-buttons-container">
            <div>
              <span>&emsp;Alignment</span>
            <div class="field-button">
              <label class="switch">
                <input type="checkbox" name="field-alignment" :value="true" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Indent</span>
            </div>
            </div>
          </div>

          <div class="field-type-buttons-container">
            <div>
              <span>&emsp;Field Type</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Label" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Label</span>
            </div>
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

    <div class="modal" v-if="edit.newLabel">
      <div class="modal-inner type-modal-inner">
        <div class="header-row">
          <div class="header-left">New Field: Label</div>

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
            <div>
              <div v-for="(section, sectionIndex) in edit.form.tabs[edit.currentTab].sections" :key="section">
              <span>&emsp;Section {{ sectionIndex + 1 }}</span>
                <div>
                <div class="field-button" v-for="(column, columnIndex) in edit.form.tabs[edit.currentTab].sections[sectionIndex].columns" :key="column">
                  <label class="switch">
                    <input type="radio" name="field-column" :value="columnIndex"/>
                    <span class="slider"></span>
                  </label>
                  <span>&emsp;Column {{ columnIndex + 1 }}</span>
                </div>
              </div>
            </div>
            </div>
          </div>
          
          <div class="field-type-buttons-container">
            <div>
              <span>&emsp;Alignment</span>
            <div class="field-button">
              <label class="switch">
                <input type="checkbox" name="field-alignment" :value="true" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Indent</span>
            </div>
            </div>
          </div>

          <div class="field-type-buttons-container">
            <div>
              <span>&emsp;Field Type</span>
            <div class="field-button">
              <label class="switch">
                <input type="radio" name="field-type" value="Label" />
                <span class="slider"></span>
              </label>
              <span>&emsp;Label</span>
            </div>
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
.properties-modal-inner {
  max-width: 500px;
  max-height: 750px;
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
  display: flex;
  justify-content: center;
}

.scrollable {
  display: flex;
}


</style>