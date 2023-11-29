import { defineStore } from 'pinia'

export const useEditStore = defineStore('editButtonClicked', {
  state: () => {
    return { editModalActive: false }
  },
  actions: {
    toggleModal() {
      this.editModalActive = !this.editModalActive
    },
    async toggleModalWait() {
      setTimeout(() => {
        this.editModalActive = !this.editModalActive
      }, 1000)
    }
  }
})
