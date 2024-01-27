import { defineStore } from 'pinia'

export const useDeleteStore = defineStore('deleteButtonClicked', {
  state: () => {
    return { deleteModalActive: false, deleteSelection: false, deleteClicked: false }
  },
  actions: {
    async toggleModalWait() {
      this.deleteSelection = true
      setTimeout(() => {
        this.deleteModalActive = !this.deleteModalActive
        this.deleteSelection = false
      }, 1000)
    },
    toggleModal() {
      this.deleteModalActive = !this.deleteModalActive
    },
    toggleAction() {
      this.deleteClicked = !this.deleteClicked
    }
  }
})
