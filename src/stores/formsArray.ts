import { defineStore } from 'pinia'
import { useSaveStore } from './saveClicked'
import { useCopyStore } from './copyClicked'
import { useDeleteStore } from './deleteClicked'
import { useSelectionStore } from './selectionMap'
import { useSortStore } from './sortStore'
import { useWarningStore } from './warningStore'
import { useEditFormStore } from './editForm'
import _ from 'lodash'
import { useGlobalFunctionStore } from './globalFunctions'

type Form = {
  isSelected: boolean
  content: string
  mapId: number
  timeCreated: number
  dateCreated: string
  id: string
  tabs: Array<any>
}

type FormGrid = {
  forms: Form[]
}

export const useFormStore = defineStore('formGrid', {
  state: () => {
    return {
      formsMap: new Map(),
      forms: []
    } as FormGrid
  },
  actions: {
    getFormsArrayLength(_increment = 0) {
      let arrayLength = this.forms.length
      if (arrayLength === null || arrayLength === undefined) {
        arrayLength = 0 + _increment
      } else {
        arrayLength = arrayLength + _increment
      }
      return arrayLength
    },

    addForm(
      _inputContent: string,
      _inputMapId: number,
      _store: any,
      _inputId: string,
      _inputTabs: Array<any>
    ) {
      if (_inputContent.trim() === '') {
        return
      }
      let formExists = this.forms.map((b) => b.content).indexOf(_inputContent)
      if (formExists === -1) {
        _store.toggleModalWait()

        const _timeCreated = new Date().getTime()
        const _dateCreated = useGlobalFunctionStore().generateDateString()

        this.forms.push({
          isSelected: false,
          content: _inputContent,
          mapId: _inputMapId,
          timeCreated: _timeCreated,
          dateCreated: _dateCreated,
          id: _inputId,
          tabs: _inputTabs
        })

        if (_store.pasteCopy === true) {
          _store.pasteCopy = false
          _store.itemProperties.splice(0, _store.itemProperties.length)
        }
      } else {
        const already_exists = useSaveStore()
        already_exists.uppercaseItem = 'Form'
        already_exists.lowercaseItem = 'form'
        already_exists.aOrAn = 'A'
        already_exists.toggleModal()
      }
    },

    loadGrid() {
      const result = localStorage.getItem('formsGrid')
      if (result === null || result === undefined) {
        return
      }
      this.forms = JSON.parse(result)
    },

    updateGrid(newVal: Form[]) {
      localStorage.setItem('formsGrid', JSON.stringify(newVal))
      this.forms = this.sortForms(false)
      this.loadGrid()
    },

    saveForm() {
      localStorage.setItem('formsGrid', JSON.stringify(this.forms))
    },

    addFormToMap(map: Map<number, number>, form: Form, value: number) {
      const selection_map = useSelectionStore()
      this.newMapId(map.size, form)
      map.set(form.mapId, value)
      selection_map.saveMap(map)
    },

    removeFormFromMap(map: Map<number, number>, key: number, form: Form) {
      const selection_map = useSelectionStore()
      form.mapId = -1
      map.delete(key)
      selection_map.saveMap(map)
    },

    selectForm(form: Form, index: number) {
      const selection_map = useSelectionStore()
      form.isSelected = !form.isSelected
      if (form.isSelected) {
        this.addFormToMap(selection_map.selectionMap, form, index)
      } else {
        this.removeFormFromMap(selection_map.selectionMap, form.mapId, form)
      }
      this.updateGrid(this.forms)
    },

    newMapId(mapId: number, form: Form) {
      const selection_map = useSelectionStore()
      if (!selection_map.selectionMap.has(mapId)) {
        form.mapId = mapId
      } else {
        mapId++
        this.newMapId(mapId, form)
      }
    },

    updateSelectionMap(map: Map<number, number>) {
      const selection_map = useSelectionStore()
      const checkbox = document.getElementById('checkboxes') as HTMLInputElement
      map.clear()
      for (let i = 0; i < this.forms.length; i++) {
        this.forms[i].isSelected = false
        this.forms[i].mapId = -1
      }
      for (let i = 0; i < this.forms.length; ++i) {
        if (checkbox.checked == true) {
          map.set(map.size - 1, i)
          this.forms[i].isSelected = true
          this.forms[i].mapId = i
        }
      }
      selection_map.saveMap(map)
      this.updateGrid(this.forms)
    },

    selectAllForms(map: Map<number, number>, form: Form[]) {
      const selection_map = useSelectionStore()
      const checkbox = document.getElementsByName('checkboxes') as NodeListOf<HTMLInputElement>
      if (map.size > 0) {
        for (const i of map.values()) {
          form[i].isSelected = false
          form[i].mapId = -1
          checkbox[i].checked = false
        }
        map.clear()
      } else {
        for (let i = 0; i < form.length; ++i) {
          map.set(i, i)
          form[i].isSelected = true
          form[i].mapId = i
          checkbox[i].checked = true
        }
      }
      selection_map.saveMap(map)
      this.updateGrid(this.forms)
    },

    deleteFormsClicked(map: Map<number, number>) {
      const delete_form = useDeleteStore()
      delete_form.deleteClicked = false
      if (map.size < 1) {
        const warning = useWarningStore()
        warning.toggleWarningModal()
        warning.header = 'You must select an Form to delete it!'
        warning.message = 'Please select at least one Form and try again.'
      } else {
        delete_form.deleteModalActive = true
      }
    },

    deleteForms(map: Map<number, number>, form: Array<any>) {
      const selection_map = useSelectionStore()
      for (let i = 0; i < map.size; i++) {
        const index = form.map((a) => a.isSelected).indexOf(true)
        form.splice(index, 1)
      }
      map.clear()
      selection_map.saveMap(map)
      this.updateGrid(this.forms)
    },

    copyClicked(map: Map<number, number>) {
      const copy_form = useCopyStore()
      const warning = useWarningStore()

      copy_form.copyClicked = false

      switch (map.size) {
        case 0:
          warning.toggleWarningModal()
          warning.header = 'You must select a Form to copy it!'
          warning.message = 'Please select a Form and try again.'
          return
        case 1:
          useEditFormStore().generateNewForm()
          const copyFrom = this.forms[map.get(0)!]
          const copyTo = useEditFormStore().form
          copyTo.content = copyFrom.content
          copyTo.tabs = copyFrom.tabs
          copy_form.toggleModal()
          break
        default:
          warning.toggleWarningModal()
          warning.header = 'You can only copy one Form at a time!'
          warning.message = 'Please select only one Form and try again.'
          break
      }
    },

    copyForm(map: Map<number, number>) {
      const copy_form = useCopyStore()
      this.addForm(
        copy_form.itemProperties[0],
        copy_form.itemProperties[1],
        copy_form,
        copy_form.itemProperties[3],
        copy_form.itemProperties[4]
      )
    },

    editForm(_form: Form, _index: number) {
      const edit = useEditFormStore()
      edit.currentForm = _index
      edit.form = _.cloneDeep(_form)
      edit.toggleModal()
    },

    clearSelectionList(map: Map<number, number>, clearCheckboxes = false) {
      const selection_map = useSelectionStore()
      if (map.size > 0) {
        if (clearCheckboxes) {
          const checkbox = document.getElementsByName('checkboxes') as NodeListOf<HTMLInputElement>
          for (let i = 0; i < this.forms.length; ++i) {
            this.forms[i].isSelected = false
            this.forms[i].mapId = -1
            checkbox[i].checked = false
          }
        } else {
          for (let i = 0; i < this.forms.length; ++i) {
            this.forms[i].isSelected = false
            this.forms[i].mapId = -1
          }
        }
        map.clear()
        selection_map.saveMap(map)
        this.updateGrid(this.forms)
        this.loadGrid()
      }
    },

    sortForms(_increment: boolean) {
      const sort_form = useSortStore()
      const storedValue = localStorage.getItem('sortGrid')!
      let sortValue = 0

      if (storedValue === null || storedValue === undefined) {
        sortValue = sortValue
      } else {
        if (JSON.parse(storedValue)[0].column != sort_form.sortStore[0].column) {
          sortValue = 1
          _increment = false
        } else {
          sortValue = JSON.parse(storedValue)[0].state
        }
      }

      if (_increment) {
        if (sortValue > 1) {
          sortValue = 0
          sort_form.sortStore[0].column = ''
        } else {
          ++sortValue
        }
      }

      sort_form.sortStore[0].state = sortValue
      sort_form.updateSortGrid()

      switch (sort_form.sortStore[0].column) {
        case 'FormName':
          switch (sortValue) {
            case 1:
              return sort_form.formSortFormNameAscending
            case 2:
              return sort_form.formSortFormNameDescending
            default:
              break
          }
          break
        case 'FormDate':
          switch (sortValue) {
            case 1:
              return sort_form.formArraySortCreatedAscending
            case 2:
              return sort_form.formArraySortCreatedDescending
            default:
              break
          }
          break
        default:
          break
      }

      return sort_form.formArraySortCreatedAscending
    }
  }
})
