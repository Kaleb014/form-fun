import { defineStore } from 'pinia'
import { useFormStore } from './formsArray'

export const useCopyStore = defineStore('copyButtonClicked', {
  state: () => {
    return {
      storeName: 'copy',
      copyClicked: false,
      copyModalActive: false,
      copyWarningModalActive: false,
      pasteCopy: false,
      itemProperties: [],
      content: '',
      forms: []
    }
  },
  actions: {
    toggleAction() {
      this.copyClicked = !this.copyClicked
    },
    toggleModal() {
      this.copyModalActive = !this.copyModalActive
    },
    toggleWarningModal() {
      this.copyWarningModalActive = !this.copyWarningModalActive
    },
    async toggleModalWait() {
      setTimeout(() => {
        this.copyModalActive = !this.copyModalActive
        useFormStore().sortForms(false)
      }, 1000)
    }
  }
})
