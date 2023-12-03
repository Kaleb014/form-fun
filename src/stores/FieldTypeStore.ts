import { defineStore } from 'pinia'

export const useFieldTypeStore = defineStore('fieldTypeStore', {
  state: () => {
    return {
      addFieldTypeModalActive: false,
      editFieldTypeModalActive: false,
      addTabModalActive: false,
      editTabModalActive: false,
      deleteTabModalActive: false,
      deleteSectionModalActive: false,
      addColumnModalActive: false,
      deleteColumnModalActive: false
    }
  },
  actions: {
    toggleAddModal() {
      this.addFieldTypeModalActive = !this.addFieldTypeModalActive
    },
    toggleEditModal() {
      this.editFieldTypeModalActive = !this.editFieldTypeModalActive
    },
    toggleDeleteTabModal() {
      this.deleteTabModalActive = !this.deleteTabModalActive
    },
    toggleAddTabModal() {
      this.addTabModalActive = !this.addTabModalActive
    },
    toggleEditTabModal() {
      this.editTabModalActive = !this.editTabModalActive
    },
    toggleDeleteSectionModal() {
      this.deleteSectionModalActive = !this.deleteSectionModalActive
    },
    toggleAddColumnModal(){
      this.addColumnModalActive = !this.addColumnModalActive
    },
    toggleDeleteColumnModal(){
      this.deleteColumnModalActive = !this.deleteColumnModalActive
    },
  }
})
