import { defineStore } from 'pinia'

export const useSaveStore = defineStore('saveButtonClicked', {
  state: () => {
    return {
      alreadyExistsModalActive: false,
      uppercaseItem: '',
      lowercaseItem: '',
      aOrAn: ''
    }
  },
  actions: {
    toggleModal() {
      this.alreadyExistsModalActive = !this.alreadyExistsModalActive
    }
  }
})
