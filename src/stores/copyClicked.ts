import { defineStore } from 'pinia'

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
      }, 1000)
    }
  }
})
