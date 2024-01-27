import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useSearchStore } from './searchStore'
import { useFormStore } from './formsArray'

export const useSortStore = defineStore('sortGridStore', {
  state: () => {
    const forms_array = useFormStore()
    const search_store = useSearchStore()

    const filteredForms = computed(() => {
      return forms_array.forms.filter((form: { content: string }) => {
        return form.content.toLowerCase().indexOf(search_store.search.toLowerCase()) > -1
      })
    })
    const formArraySortCreatedAscending = computed(() =>
      forms_array.forms.sort((a: { timeCreated: number }, b: { timeCreated: number }) => {
        return a.timeCreated - b.timeCreated
      })
    )
    const formArraySortCreatedDescending = computed(() =>
      forms_array.forms.sort((a: { timeCreated: number }, b: { timeCreated: number }) => {
        return b.timeCreated - a.timeCreated
      })
    )
    const formSortFormNameAscending = computed(() =>
      forms_array.forms.sort((a: { content: string }, b: { content: any }) => {
        return a.content.localeCompare(b.content)
      })
    )
    const formSortFormNameDescending = computed(() =>
      forms_array.forms.sort((a: { content: any }, b: { content: string }) => {
        return b.content.localeCompare(a.content)
      })
    )

    return {
      sortStore: [
        {
          id: 'Forms',
          column: '',
          state: 0
        }
      ],

      formSortFormNameAscending,
      formSortFormNameDescending,
      formArraySortCreatedAscending,
      formArraySortCreatedDescending,
      filteredForms
    }
  },
  actions: {
    updateSortGrid() {
      localStorage.setItem('sortGrid', JSON.stringify(this.sortStore))
    },

    loadSortGrid() {
      const result = localStorage.getItem('sortGrid')
      if (result === null || result === undefined) {
        return
      }
      this.sortStore = JSON.parse(result)
    }
  }
})
