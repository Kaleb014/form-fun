import { defineStore } from 'pinia'

export const useSelectAllStore = defineStore('selectAllButtonClicked', {
  state: () => {
    return { selectAll: false }
  },
  actions: {
    selectAllClicked() {
      this.selectAll = !this.selectAll
    }
  }
})
