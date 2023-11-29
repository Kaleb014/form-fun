import { defineStore } from 'pinia'
import { useEditFormStore } from './editForm'
import { useFormStore } from './formsArray'

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
        useFormStore().sortForms(false)
      }, 500)
    },
    toggleModal() {
      this.addModalActive = !this.addModalActive
      if (this.addModalActive) {
        const form = useEditFormStore()
        form.generateNewForm()
      }
    }
  }
})
