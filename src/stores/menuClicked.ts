import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuButtonClicked', {
  state: () => {
    return { menuModalActive: false, menuClicked: false }
  },
  actions: {
    documentClicked(e: any) {
      if (!e.target.matches('.menu_dropdown')) {
        this.toggleModal()
      }
    },
    async toggleModal() {
      if (this.menuModalActive) {
        this.menuClicked = false
        setTimeout(() => {
          this.menuModalActive = false
          console.log('modal off')
        }, 700)
      } else {
        this.menuModalActive = true
        setTimeout(() => {
          this.menuClicked = true
          console.log('modal on')
        }, 100)
      }
    }
  }
})
