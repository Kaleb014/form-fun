import { defineStore } from 'pinia'

export const useWarningStore = defineStore('warningStoreDef', {
  state: () => {
    return { warningModalActive: false, header: '', message: '' }
  },
  actions: {
    toggleWarningModal() {
      this.warningModalActive = !this.warningModalActive
    }
  }
})
