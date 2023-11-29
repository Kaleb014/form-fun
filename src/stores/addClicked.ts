import { defineStore } from 'pinia'
import { useEditFormStore } from './editForm'

export const useAddStore = defineStore('addButtonClicked', {
  state: () => {
    return {
      storeName: 'add',
      addModalActive: false
    }
  },
  actions: {
    async toggleModalWait() {
      setTimeout(() => {
        this.addModalActive = !this.addModalActive
        console.log('add modal active = ' + this.addModalActive)
      }, 500)
    },
    toggleModal() {
      this.addModalActive = !this.addModalActive
      console.log('add modal active = ' + this.addModalActive)
      if (this.addModalActive) {
        const form = useEditFormStore()
        form.generateNewForm()
      }
    }
  }
})
