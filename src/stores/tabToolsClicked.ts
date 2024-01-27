import { defineStore } from 'pinia'

export const useTabToolsStore = defineStore('tabToolsButtonClicked', {
  state: () => {
    return { tabToolsModalActive: false, tabsClicked: false }
  },
  actions: {
    documentClicked(e: any) {
      if (!e.target.matches('.tabs_dropdown')) {
        this.toggleModal()
      }
    },
    async toggleModal() {
      if (this.tabToolsModalActive) {
        this.tabsClicked = false
        setTimeout(() => {
          this.tabToolsModalActive = false
        }, 700)
      } else {
        this.tabToolsModalActive = true
        setTimeout(() => {
          this.tabsClicked = true
        }, 100)
      }
    }
  }
})
