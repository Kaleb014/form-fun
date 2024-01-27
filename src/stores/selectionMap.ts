import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selectionMapStore', {
  state: () => {
    return { selectionMap: new Map() }
  },
  actions: {
    saveMap(map: Map<number, number>) {
      const mapObject = Object.fromEntries(map)
      const jsonString = JSON.stringify(mapObject)
      localStorage.setItem('selected', jsonString)
    },
    loadMap() {
      const result = localStorage.getItem('selected')
      if (result === null || result === undefined) {
        return
      }
      this.selectionMap = new Map(Object.entries(JSON.parse(result)))
    }
  }
})
