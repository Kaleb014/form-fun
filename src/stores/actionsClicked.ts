import { defineStore } from 'pinia'

export const useActionStore = defineStore('actionClicked', {
  state: () => {
    return { actionsModalActive: false, actionsClicked: false, mouseX: -1, mouseY: -1 }
  },
  actions: {
    documentClicked(e: any) {
      if (!e.target.matches('.action_list')) {
        this.toggleModal()
      }
    },
    getMousePosition(e: any) {
      this.mouseX = e.pageX
      this.mouseY = e.pageY
      console.log('X: ' + this.mouseX + ' ' + 'Y: ' + this.mouseY)
    },
    async toggleModal() {
      if (this.actionsModalActive) {
        this.actionsClicked = false
        setTimeout(() => {
          this.actionsModalActive = false
          console.log('modal off')
        }, 700)
      } else {
        this.actionsModalActive = true
        setTimeout(() => {
          this.actionsClicked = true
          console.log('modal on')
        }, 100)
      }
    }
  }
})
