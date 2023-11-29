import { defineStore } from 'pinia'

export const useToolTipsStore = defineStore('toolTips', {
  state: () => {
    return { useToolTips: true }
  },
  actions: {
    toggleToolTips() {
      this.useToolTips = !this.useToolTips
    }
  }
})
