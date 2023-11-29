import { defineStore } from 'pinia'

export const useSortClickedStore = defineStore('sortClickedStore', {
  state: () => {
    return { sort: false }
  },
  actions: {
    sortClicked() {
      this.sort = !this.sort
    }
  }
})
