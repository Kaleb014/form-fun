import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStoreDef', {
  state: () => {
    return { search: '' }
  }
})
