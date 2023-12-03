<script setup lang="ts">
import AlreadyExistsModal from './AlreadyExistsModal.vue'
import { useAddStore } from '../../stores/addClicked'
import { useSaveStore } from '../../stores/saveClicked'
import { useCopyStore } from '../../stores/copyClicked'
import { useEditFormStore } from '../../stores/editForm'
import { useToolTipsStore } from '../../stores/toolTipsStore'
import { useFieldTypeStore } from '../../stores/FieldTypeStore'
import { onMounted, onUnmounted } from 'vue'
import { useGlobalFunctionStore } from '../../stores/globalFunctions'
import _ellipses from '../../assets/3-vertical-dots-icon-export.png'
import _ellipsesHover from '../../assets/ellipses-hover-export.png'

const tool_tips = useToolTipsStore()
const edit = useEditFormStore()
const copy_clicked = useCopyStore()
const add_clicked = useAddStore()
const already_exists = useSaveStore()
const field_type = useFieldTypeStore()
const global = useGlobalFunctionStore()

const _ellipsesImg = _ellipses
const _ellipsesImgHover = _ellipsesHover

// TODO: Move to Sort Store
function filteredFieldsLeft(i: number) {
  return edit.form.tabs[edit.currentTab].sections[i].fields.filter((a: any) => {
    return a.alignment.indexOf('left') > -1 || a.alignment.indexOf('left-tabbed') > -1
  })
}
function filteredFieldsCenter(i: number) {
  return edit.form.tabs[edit.currentTab].sections[i].fields.filter((a: any) => {
    return a.alignment.indexOf('center') > -1 || a.alignment.indexOf('center-tabbed') > -1
  })
}
function filteredFieldsRight(i: number) {
  return edit.form.tabs[edit.currentTab].sections[i].fields.filter((a: any) => {
    return a.alignment.indexOf('right') > -1 || a.alignment.indexOf('right-tabbed') > -1
  })
}

onMounted(() => {
  // edit.tabClicked(edit.currentTab, edit.currentTab)
  // edit.deselectAllFields()
  // console.log('tab length = ' + edit.form.tabs.length)
})

onUnmounted(() => {
  edit.resetState()
  console.log('calling reset')
})
</script>

<template>
  <div class="modal" v-if="edit.editModalActive">
    <div class="modal-inner">
      <div name="title-bar" class="header-row">
        <div class="header-left">Form: {{ edit.form.content }}</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="edit.toggleModal()">ⓧ</button>
        </div>
      </div>

      <div name="description-row" class="permanent-row">
        <div class="permanent-left">
          <div class="row">
            <span> Description </span>
            <div class="row-inner">
              <input type="text" placeholder=" Form Description..." v-model="edit.form.content" />
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div class="permanent-right">
            <div :class="edit.showTabTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteTabModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-tab" v-if="tool_tips.useToolTips"
                      >Delete Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleEditTabModal()"
                >
                  <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text edit-tab" v-if="tool_tips.useToolTips"
                      >Edit Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleAddTabModal()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-tab" v-if="tool_tips.useToolTips"
                      >Add Tab</span
                    >
                  </div>
                </button>
              </div>
            </div>

            <button
              class="ellipses-command-button tooltip tabs_dropdown"
              type="button"
              @click="edit.showTabTools = !edit.showTabTools"
            >
              <img
                :src="edit.mouseOverTabTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverTabTools = true"
                @mouseleave="edit.mouseOverTabTools = false"
              />
              <div class="tooltip-container">
                <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                  >Tab Tools</span
                >
              </div>
            </button>
          </div>
        </div>
      </div>

      <div name="tabs" class="tab-row">
        <div class="arrow-left">
          <button
            class="pointer arrow-button"
            id="slide-back"
            @mouseover="global.scrollLeft = true; global.ScrollLeft()"
            @mouseleave="global.scrollLeft = false"
          >
            <img width="8" height="12" src="../../assets/arrow-left-icon-export.png" />
          </button>
        </div>
        <div class="tab-left" id="tab-left">
          <button
            v-for="(tab, index) in edit.form.tabs"
            :key="index"
            class="tab"
            :class="{ 'selected-tab': index === edit.currentTab }"
            @click="edit.tabClicked(edit.currentTab, (edit.currentTab = index))"
            type="button"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="arrow-right">
          <button
            class="pointer arrow-button"
            id="slide"
            @mouseover="global.scrollRight = true; global.ScrollRight()"
            @mouseleave="global.scrollRight = false"
          >
            <img width="8" height="12" src="../../assets/arrow-right-icon-export.png" />
          </button>
        </div>
      </div>

      <div name="field-tools" class="permanent-row tools">
        <div class="permanent-left">
          <div class="permanent-left">
            <button
              class="ellipses-command-button tooltip"
              type="button"
              @click="edit.showSectionTools = !edit.showSectionTools"
            >
              <img
                :src="edit.mouseOverSectionTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverSectionTools = true"
                @mouseleave="edit.mouseOverSectionTools = false"
              />
              <div class="tooltip-container">
                <span class="right-tooltip-text section-tools" v-if="tool_tips.useToolTips"
                  >Section Tools</span
                >
              </div>
            </button>

            <div :class="edit.showSectionTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="edit.addSection()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-section" v-if="tool_tips.useToolTips"
                      >Add Section</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteSectionModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-section" v-if="tool_tips.useToolTips"
                      >Delete Section</span
                    >
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div :class="edit.showFieldTools ? 'button_tools' : 'button_tools_hidden'">
            <div class="medium-command-button">
              <button class="command-button tooltip" type="button" @click="edit.deleteField()">
                <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text delete" v-if="tool_tips.useToolTips">Delete</span>
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.copyField()">
                <img
                  src="../../assets/copy-outline-icon-export-export.png"
                  width="18"
                  height="22"
                />
                <div class="tooltip-container">
                  <span class="up-tooltip-text duplicate" v-if="tool_tips.useToolTips"
                    >Duplicate</span
                  >
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.editField()">
                <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text edit" v-if="tool_tips.useToolTips">Edit</span>
                </div>
              </button>

              <button
                class="command-button tooltip"
                type="button"
                @click="field_type.toggleAddModal()"
              >
                <img src="../../assets/add-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text add" v-if="tool_tips.useToolTips">Add</span>
                </div>
              </button>
            </div>
          </div>

          <button
            class="ellipses-command-button tooltip tabs_dropdown"
            type="button"
            @click="edit.showFieldTools = !edit.showFieldTools"
          >
            <img
              :src="edit.mouseOverFieldtools ? _ellipsesImgHover : _ellipsesImg"
              width="5"
              height="20"
              @mouseenter="edit.mouseOverFieldtools = true"
              @mouseleave="edit.mouseOverFieldtools = false"
            />
            <div class="tooltip-container">
              <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                >Field Tools</span
              >
            </div>
          </button>
        </div>
      </div>

      <div class="scrollable">
        <div name="fields" class="section" v-for="(section, sectionIndex) in edit.form.tabs[edit.currentTab].sections" :key="section">
          <div class="left-right-center" id="info" v-if="edit.infoSelected">

            <div class="column">
              <div name="left-fields" class="field-row" v-for="(field, index) in filteredFieldsLeft(sectionIndex)" :key="index">
                
                <div v-if="field.type === 'label'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.value }}
                    </span>
                  </div>
                </div>

                <div v-if="field.type === 'text'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}
                    </span>
                  </div>
                  <div class="field-value-row">
                    <textarea class="field-value">{{ field.value }}</textarea>
                  </div>
                </div>

                <div v-if="field.type === 'number'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-description selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}:
                    </span>
                  </div>
                  <div class="field-value-row">
                    <input type="text" class="field-value" v-model="field.value" />
                  </div>
                  
                </div>

              </div>
            </div>

            <div class="column">
              <div name="center-fields" class="field-row" v-for="(field, index) in filteredFieldsCenter(sectionIndex)" :key="index">
                
                <div v-if="field.type === 'label'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.value }}
                    </span>
                  </div>
                </div>

                <div v-if="field.type === 'text'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}
                    </span>
                  </div>
                  <div class="field-value-row">
                    <textarea class="field-value">{{ field.value }}</textarea>
                  </div>
                </div>

                <div v-if="field.type === 'number'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-description selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}:
                    </span>
                  </div>
                  <div class="field-value-row">
                    <input type="text" class="field-value" v-model="field.value" />
                  </div>
                  
                </div>

              </div>
            </div>

            <div class="column">
              <div name="right-fields" class="field-row" v-for="(field, index) in filteredFieldsRight(sectionIndex)" :key="index">
                
                <div v-if="field.type === 'label'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.value }}
                    </span>
                  </div>
                </div>

                <div v-if="field.type === 'text'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-value selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}
                    </span>
                  </div>
                  <div class="field-value-row">
                    <textarea class="field-value">{{ field.value }}</textarea>
                  </div>
                </div>

                <div v-if="field.type === 'number'" :class="field.alignment">
                  <div class="field-row-inner">
                    <label class="switch">
                      <input type="checkbox" v-model="field.isOn" />
                      <span class="slider"></span>
                    </label>
                    <span
                      name="selectable-field"
                      class="field-description selectable"
                      @click="edit.selectField(field)"
                      :class="{ 'is-selected-outline': field.isSelected }"
                    >
                      {{ field.description }}:
                    </span>
                  </div>
                  <div class="field-value-row">
                    <input type="text" class="field-value" v-model="field.value" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="button-force-bottom">
        <div class="button-container">
          <div name="save-cancel" class="modal_lower_button">
            <div class="small-body-button">
              <button type="submit" @click="edit.saveClicked(edit)">Save</button>
              <button type="button" @click="edit.toggleModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="add_clicked.addModalActive">
    <div class="modal-inner">
      <div name="title-bar" class="header-row">
        <div class="header-left">Form: {{ edit.form.content }}</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="add_clicked.toggleModal()">ⓧ</button>
        </div>
      </div>

      <div name="description-row" class="permanent-row">
        <div class="permanent-left">
          <div class="row">
            <span> Description </span>
            <div class="row-inner">
              <input type="text" placeholder="Form Description..." v-model="edit.form.content" />
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div class="permanent-right">
            <div :class="edit.showTabTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteTabModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-tab" v-if="tool_tips.useToolTips"
                      >Delete Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleEditTabModal()"
                >
                  <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text edit-tab" v-if="tool_tips.useToolTips"
                      >Edit Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleAddTabModal()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-tab" v-if="tool_tips.useToolTips"
                      >Add Tab</span
                    >
                  </div>
                </button>
              </div>
            </div>

            <button
              class="ellipses-command-button tooltip tabs_dropdown"
              type="button"
              @click="edit.showTabTools = !edit.showTabTools"
            >
              <img
                :src="edit.mouseOverTabTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverTabTools = true"
                @mouseleave="edit.mouseOverTabTools = false"
              />
              <div class="tooltip-container">
                <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                  >Tab Tools</span
                >
              </div>
            </button>
          </div>
        </div>
      </div>

      <div name="tabs" class="tab-row">
        <div class="arrow-left">
          <button
            class="pointer arrow-button"
            id="slide-back"
            @mouseover="global.scrollLeft = true; global.ScrollLeft()"
            @mouseleave="global.scrollLeft = false"
          >
            <img width="8" height="12" src="../../assets/arrow-left-icon-export.png" />
          </button>
        </div>
        <div class="tab-left" id="tab-left">
          <button
            v-for="(tab, index) in edit.form.tabs"
            :key="index"
            class="tab"
            :class="{ 'selected-tab': index === edit.currentTab }"
            @click="edit.tabClicked(edit.currentTab, (edit.currentTab = index))"
            type="button"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="arrow-right">
          <button
            class="pointer arrow-button"
            id="slide"
            @mouseover="global.scrollRight = true; global.ScrollRight()"
            @mouseleave="global.scrollRight = false"
          >
            <img width="8" height="12" src="../../assets/arrow-right-icon-export.png" />
          </button>
        </div>
      </div>

      <div name="field-tools" class="permanent-row tools">
        <div class="permanent-left">
          <div class="permanent-left">
            <button
              class="ellipses-command-button tooltip"
              type="button"
              @click="edit.showSectionTools = !edit.showSectionTools"
            >
              <img
                :src="edit.mouseOverSectionTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverSectionTools = true"
                @mouseleave="edit.mouseOverSectionTools = false"
              />
              <div class="tooltip-container">
                <span class="right-tooltip-text section-tools" v-if="tool_tips.useToolTips"
                  >Section Tools</span
                >
              </div>
            </button>

            <div :class="edit.showSectionTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="edit.addSection()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-section" v-if="tool_tips.useToolTips"
                      >Add Section</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteSectionModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-section" v-if="tool_tips.useToolTips"
                      >Delete Section</span
                    >
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div :class="edit.showFieldTools ? 'button_tools' : 'button_tools_hidden'">
            <div class="medium-command-button">
              <button class="command-button tooltip" type="button" @click="edit.deleteField()">
                <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text delete" v-if="tool_tips.useToolTips">Delete</span>
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.copyField()">
                <img
                  src="../../assets/copy-outline-icon-export-export.png"
                  width="18"
                  height="22"
                />
                <div class="tooltip-container">
                  <span class="up-tooltip-text duplicate" v-if="tool_tips.useToolTips"
                    >Duplicate</span
                  >
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.editField()">
                <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text edit" v-if="tool_tips.useToolTips">Edit</span>
                </div>
              </button>

              <button
                class="command-button tooltip"
                type="button"
                @click="field_type.toggleAddModal()"
              >
                <img src="../../assets/add-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text add" v-if="tool_tips.useToolTips">Add</span>
                </div>
              </button>
            </div>
          </div>

          <button
            class="ellipses-command-button tooltip tabs_dropdown"
            type="button"
            @click="edit.showFieldTools = !edit.showFieldTools"
          >
            <img
              :src="edit.mouseOverFieldtools ? _ellipsesImgHover : _ellipsesImg"
              width="5"
              height="20"
              @mouseenter="edit.mouseOverFieldtools = true"
              @mouseleave="edit.mouseOverFieldtools = false"
            />
            <div class="tooltip-container">
              <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                >Field Tools</span
              >
            </div>
          </button>
        </div>
      </div>

      <div class="scrollable">
        <div
          name="fields"
          class="section"
          v-for="(section, sectionIndex) in edit.form.tabs[edit.currentTab].sections"
          :key="section"
        >
          <div class="left-right-center" id="info" v-if="edit.infoSelected">
            <div class="column">
              <div
                name="left-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsLeft(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
            <div class="column">
              <div
                name="center-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsCenter(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
            <div class="column">
              <div
                name="right-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsRight(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="button-force-bottom">
        <div class="button-container">
          <div name="save-cancel" class="modal_lower_button">
            <div class="small-body-button">
              <button type="submit" @click="edit.saveClicked(add_clicked)">Save</button>
              <button type="button" @click="add_clicked.toggleModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="copy_clicked.copyModalActive">
    <div class="modal-inner">
      <div name="title-bar" class="header-row">
        <div class="header-left">Form: {{ edit.form.content }}</div>

        <div class="header-right">
          <button type="button" class="exit-button" @click="copy_clicked.toggleModal()">ⓧ</button>
        </div>
      </div>

      <div name="description-row" class="permanent-row">
        <div class="permanent-left">
          <div class="row">
            <span> Description </span>
            <div class="row-inner">
              <input type="text" placeholder="Form Description..." v-model="edit.form.content" />
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div class="permanent-right">
            <div :class="edit.showTabTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteTabModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-tab" v-if="tool_tips.useToolTips"
                      >Delete Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleEditTabModal()"
                >
                  <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text edit-tab" v-if="tool_tips.useToolTips"
                      >Edit Tab</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleAddTabModal()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-tab" v-if="tool_tips.useToolTips"
                      >Add Tab</span
                    >
                  </div>
                </button>
              </div>
            </div>

            <button
              class="ellipses-command-button tooltip tabs_dropdown"
              type="button"
              @click="edit.showTabTools = !edit.showTabTools"
            >
              <img
                :src="edit.mouseOverTabTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverTabTools = true"
                @mouseleave="edit.mouseOverTabTools = false"
              />
              <div class="tooltip-container">
                <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                  >Tab Tools</span
                >
              </div>
            </button>
          </div>
        </div>
      </div>

      <div name="tabs" class="tab-row">
        <div class="arrow-left">
          <button
            class="pointer arrow-button"
            id="slide-back"
            @mouseover="global.scrollLeft = true; global.ScrollLeft()"
            @mouseleave="global.scrollLeft = false"
          >
            <img width="8" height="12" src="../../assets/arrow-left-icon-export.png" />
          </button>
        </div>
        <div class="tab-left" id="tab-left">
          <button
            v-for="(tab, index) in edit.form.tabs"
            :key="index"
            class="tab"
            :class="{ 'selected-tab': index === edit.currentTab }"
            @click="edit.tabClicked(edit.currentTab, (edit.currentTab = index))"
            type="button"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="arrow-right">
          <button
            class="pointer arrow-button"
            id="slide"
            @mouseover="global.scrollRight = true; global.ScrollRight()"
            @mouseleave="global.scrollRight = false"
          >
            <img width="8" height="12" src="../../assets/arrow-right-icon-export.png" />
          </button>
        </div>
      </div>

      <div name="field-tools" class="permanent-row tools">
        <div class="permanent-left">
          <div class="permanent-left">
            <button
              class="ellipses-command-button tooltip"
              type="button"
              @click="edit.showSectionTools = !edit.showSectionTools"
            >
              <img
                :src="edit.mouseOverSectionTools ? _ellipsesImgHover : _ellipsesImg"
                width="5"
                height="20"
                @mouseenter="edit.mouseOverSectionTools = true"
                @mouseleave="edit.mouseOverSectionTools = false"
              />
              <div class="tooltip-container">
                <span class="right-tooltip-text section-tools" v-if="tool_tips.useToolTips"
                  >Section Tools</span
                >
              </div>
            </button>

            <div :class="edit.showSectionTools ? 'button_tools' : 'button_tools_hidden'">
              <div class="medium-command-button">
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="edit.addSection()"
                >
                  <img src="../../assets/add-icon-export.png" width="22" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text add-section" v-if="tool_tips.useToolTips"
                      >Add Section</span
                    >
                  </div>
                </button>
                <button
                  class="command-button tooltip"
                  type="button"
                  @click="field_type.toggleDeleteSectionModal()"
                >
                  <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                  <div class="tooltip-container">
                    <span class="up-tooltip-text delete-section" v-if="tool_tips.useToolTips"
                      >Delete Section</span
                    >
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="permanent-right">
          <div :class="edit.showFieldTools ? 'button_tools' : 'button_tools_hidden'">
            <div class="medium-command-button">
              <button class="command-button tooltip" type="button" @click="edit.deleteField()">
                <img src="../../assets/delete-icon-export.png" width="18" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text delete" v-if="tool_tips.useToolTips">Delete</span>
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.copyField()">
                <img
                  src="../../assets/copy-outline-icon-export-export.png"
                  width="18"
                  height="22"
                />
                <div class="tooltip-container">
                  <span class="up-tooltip-text duplicate" v-if="tool_tips.useToolTips"
                    >Duplicate</span
                  >
                </div>
              </button>

              <button class="command-button tooltip" type="button" @click="edit.editField()">
                <img src="../../assets/edit-round-line-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text edit" v-if="tool_tips.useToolTips">Edit</span>
                </div>
              </button>

              <button
                class="command-button tooltip"
                type="button"
                @click="field_type.toggleAddModal()"
              >
                <img src="../../assets/add-icon-export.png" width="22" height="22" />
                <div class="tooltip-container">
                  <span class="up-tooltip-text add" v-if="tool_tips.useToolTips">Add</span>
                </div>
              </button>
            </div>
          </div>

          <button
            class="ellipses-command-button tooltip tabs_dropdown"
            type="button"
            @click="edit.showFieldTools = !edit.showFieldTools"
          >
            <img
              :src="edit.mouseOverFieldtools ? _ellipsesImgHover : _ellipsesImg"
              width="5"
              height="20"
              @mouseenter="edit.mouseOverFieldtools = true"
              @mouseleave="edit.mouseOverFieldtools = false"
            />
            <div class="tooltip-container">
              <span class="left-tooltip-text tab-tools" v-if="tool_tips.useToolTips"
                >Field Tools</span
              >
            </div>
          </button>
        </div>
      </div>

      <div class="scrollable">
        <div
          name="fields"
          class="section"
          v-for="(section, sectionIndex) in edit.form.tabs[edit.currentTab].sections"
          :key="section"
        >
          <div class="left-right-center" id="info" v-if="edit.infoSelected">
            <div class="column">
              <div
                name="left-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsLeft(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
            <div class="column">
              <div
                name="center-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsCenter(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
            <div class="column">
              <div
                name="right-fields"
                class="field-row"
                v-for="(field, index) in filteredFieldsRight(sectionIndex)"
                :key="index"
              >
                <div v-if="field.type === 'text'" class="field-row-inner" :class="field.alignment">
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-value selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.value }}
                  </span>
                </div>
                <div
                  v-if="field.type === 'number'"
                  class="field-row-inner"
                  :class="field.alignment"
                >
                  <label class="switch">
                    <input type="checkbox" v-model="field.isOn" />
                    <span class="slider"></span>
                  </label>
                  <span
                    name="selectable-field"
                    class="field-description selectable"
                    @click="edit.selectField(field)"
                    :class="{ 'is-selected-outline': field.isSelected }"
                  >
                    {{ field.description }}:
                  </span>
                  <input type="text" class="field-value" v-model="field.value" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="button-force-bottom">
        <div class="button-container">
          <div name="save-cancel" class="modal_lower_button">
            <div class="small-body-button">
              <button type="submit" @click="edit.saveClicked(copy_clicked)">Save</button>
              <button type="button" @click="copy_clicked.toggleModal()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AlreadyExistsModal v-if="already_exists.alreadyExistsModalActive" />
</template>

<style scoped>
input[type="text"] {
  max-width: 200px;
}

.button-force-bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.button_tools_hidden {
  transition: all 0.5s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.button_tools {
  transition: all 0.5s ease-in-out;
  opacity: 100;
}

.field-value-row {
  position: relative;
  margin-left: var(--formFieldSpacing);
}

.selectable {
  cursor: pointer;
  user-select: none;
}

.is-selected-outline {
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 0 1px #5f616d;
  outline-color: transparent; /* for high contrast modes */
  transition: 0.1s;
  /*outline:#5f616d 1px solid;*/
}

.arrow-button {
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background-color: rgba(55, 60, 61, 0.5);
  border: solid 1px #5f616d5b;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  justify-content: center;
  align-items: center;
}

.arrow-button:hover {
  background-color: rgba(55, 60, 61, 1);
  border: solid 1px #5f616d;
}

.arrow-left {
  display: flex;
  position: relative;
  bottom: -10px;
  left: -4px;
}

.arrow-right {
  display: flex;
  position: relative;
  bottom: -10px;
  right: -4px;
}

.tools {
  border-bottom: 1px solid #4a4c55;
}

.section {
  width: 100%;
  border-top: 1px solid #4a4c55;
}

.section:nth-child(1) {
  border-top: none;
}

.scrollable {
  padding: 0;
  height: auto;
  overflow: auto;
  margin-bottom: 35px;
}

.column {
  width: 100%;
}

.left-right-center {
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
}

.modal-inner {
  height: 750px;
  width: 1000px;
  max-width: 100vw;
}

.row {
  padding-top: 4px;
  padding-bottom: 4px;
}

.field-row {
  padding-top: 4px;
  padding-bottom: 4px;
}

.field-row-inner {
  display: flex;
  white-space: nowrap;
  align-items: center;
}

.left {
  position: relative;
  justify-content: left;
}

.right {
  position: relative;
  justify-content: left;
}

.center {
  position: relative;
  justify-content: left;
}

.left-tabbed {
  position: relative;
  justify-content: left;
  margin-left: 30px;
}

.right-tabbed {
  position: relative;
  justify-content: left;
  margin-left: 30px;
}

.center-tabbed {
  position: relative;
  justify-content: left;
  margin-left: 30px;
}

.field-checkbox {
  margin-right: 5px;
}

.field-description {
  margin-right: 5px;
  font-size: medium;
}

.field-value {
  font-size: medium;
}

textarea {
  width: 250px;
  height: 150px;
}

.permanent-row {
  width: 100%;
  min-height: 35px;
  display: flex;
  margin-top: 6px;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
  align-items: center;
}

.permanent-right {
  width: 50%;
  display: flex;
  justify-content: right;
}

.permanent-left {
  width: 50%;
  display: flex;
  justify-content: left;
  font-size: large;
}

.tooltip-container {
  display: flex;
  position: absolute;
}

.up-tooltip-text {
  position: absolute;
}

.add-tab {
  left: -32.5px;
  top: -45px;
}

.edit-tab {
  left: -32.5px;
  top: -45px;
}

.delete-tab {
  left: -40px;
  top: -45px;
}

.delete {
  left: -26px;
  top: -45px;
}

.duplicate {
  left: -35.5px;
  top: -45px;
}

.edit {
  left: -17.5px;
  top: -45px;
}

.add {
  left: -18.5px;
  top: -45px;
}

.add-section {
  left: -43.5px;
  top: -45px;
}

.tab-tools {
  right: 12px;
  top: -12px;
}

.section-tools {
  left: 12px;
  top: -12px;
}

.delete-section {
  left: -51px;
  top: -45px;
}


</style>
