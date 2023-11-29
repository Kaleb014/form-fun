import { defineStore } from 'pinia'
import _ from 'lodash'
import { useFormStore } from './formsArray'
import { useFieldTypeStore } from './FieldTypeStore'
import { useWarningStore } from './warningStore'
import { v4 as uuidv4, version as uuidVersion, validate as uuidValidate } from 'uuid'
import { useAddStore } from './addClicked'
import { useCopyStore } from './copyClicked'
import { useGlobalFunctionStore } from './globalFunctions'
import { useSortStore } from './sortStore'

type Form = {
  isSelected: boolean
  content: string
  mapId: number
  timeCreated: number
  dateCreated: string
  id: string
  tabs: Array<any>
}

export const useEditFormStore = defineStore('editFormButtonClicked', {
  state: () => {
    return {
      storeName: 'edit',
      editClicked: false,
      editModalActive: false,
      addModalActive: false,
      editWarningModalActive: false,
      mouseOverSectionTools: false,
      mouseOverTabTools: false,
      mouseOverFieldtools: false,
      showTabTools: false,
      showSectionTools: false,
      showFieldTools: false,
      missingInfo: false,
      currentForm: -1,
      infoSelected: true,
      formulasSelected: false,
      itemsSelected: false,
      newText: false,
      newType: false,
      newNumber: false,
      newItem: false,
      newFormula: false,
      getFieldProperties: true,
      alignment: '',
      section: 0,
      currentTab: 0,
      currentSection: 0,
      currentField: 0,
      selectionArray: [],
      form: {
        isSelected: false,
        content: '',
        mapId: -1,
        timeCreated: -1,
        dateCreated: '',
        id: '',
        tabs: [
          {
            name: '',
            isSelected: false,
            sections: [{ fields: [] }]
          }
        ]
      } as Form
    }
  },
  actions: {
    toggleAction() {
      this.editClicked = !this.editClicked
    },
    toggleModal() {
      this.editModalActive = !this.editModalActive
    },
    resetState() {
      this.$reset()
    },
    generateNewForm() {
      this.form.isSelected = false
      this.form.content = 'New Form'
      this.form.mapId = -1
      this.form.timeCreated = new Date().getTime()
      this.form.dateCreated = useGlobalFunctionStore().generateDateString()
      this.form.id = this.generateGuid()
      this.form.tabs = [
        {
          name: 'Default',
          isSelected: false,
          sections: [{ fields: [] }]
        }
      ]
    },
    generateGuid() {
      const generate_guid = uuidv4()
      if (!this.validateGuidv4(generate_guid)) {
        this.generateGuid()
      }
      return generate_guid
    },

    validateGuidv4(guid: string) {
      return uuidValidate(guid) && uuidVersion(guid) === 4
    },

    toggleCopyModal() {},
    toggleWarningModal() {
      this.editWarningModalActive = !this.editWarningModalActive
    },
    async toggleModalWait() {
      setTimeout(() => {
        this.editModalActive = !this.editModalActive
        useFormStore().sortForms(false)
      }, 500)
    },
    saveClicked(_store: any) {
      if (this.form.content.trim() === '') {
        this.missingInfo = true
        return
      }

      const forms_array = useFormStore()

      switch (_store) {
        case useAddStore():
          console.log(_store.storeName)
          this.deselectAllFields()
          this.missingInfo = false
          forms_array.forms.push(this.form)
          forms_array.updateGrid(forms_array.forms)
          console.log('case: add')
          break
        case useCopyStore():
          console.log(_store.storeName)
          this.deselectAllFields()
          this.missingInfo = false
          forms_array.forms.push(this.form)
          forms_array.updateGrid(forms_array.forms)
          console.log('case: copy')
          break
        case useEditFormStore():
          console.log(_store.storeName)
          this.deselectAllFields()
          this.missingInfo = false
          forms_array.forms[this.currentForm] = this.form
          forms_array.updateGrid(forms_array.forms)
          console.log('case: edit')
          break
      }

      _store.toggleModalWait()
    },
    infoClicked() {
      this.formulasSelected = false
      this.itemsSelected = false
      this.infoSelected = true
    },
    formulasClicked() {
      this.itemsSelected = false
      this.infoSelected = false
      this.formulasSelected = true
    },
    itemsClicked() {
      this.formulasSelected = false
      this.infoSelected = false
      this.itemsSelected = true
    },
    tabClicked(_oldIndex: number, _newIndex: number) {
      this.form.tabs[_oldIndex].isSelected = false
      this.form.tabs[_newIndex].isSelected = true
    },
    closeInputModals() {
      this.newNumber = false
      this.newText = false
      this.newItem = false
      this.newFormula = false
    },
    setFieldProperties() {
      //Section
      const _section = document.getElementsByName('field-section') as NodeListOf<HTMLInputElement>
      for (let i = 0; i <= _section.length; ++i) {
        if (i === _section.length) {
          console.log('no section selected')
          const warning = useWarningStore()
          warning.toggleWarningModal()
          warning.message = 'Select a section and try again.'
          warning.header = 'Section is a required field.'
          return
        } else {
          console.log('checking section value')
          if (_section[i].checked) {
            this.section = i
            break
          }
        }
      }
      //Alignment
      const _alignment = document.querySelector(
        'input[name="field-alignment"]:checked'
      ) as HTMLInputElement
      if (_alignment === null || _alignment === undefined) {
        const warning = useWarningStore()
        warning.toggleWarningModal()
        warning.message = 'Select an alignment and try again.'
        warning.header = 'Alignment is a required field.'
        return
      } else {
        switch (_alignment.value) {
          case 'Left':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'left'
            break
          case 'Left-tabbed':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'left-tabbed'
            break
          case 'Center':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'center'
            break
          case 'Center-tabbed':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'center-tabbed'
            break
          case 'Right':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'right'
            break
          case 'Right-tabbed':
            console.log(JSON.stringify(_alignment.value))
            this.alignment = 'right-tabbed'
            break
        }
      }
      //Type
      const _type = document.querySelector('input[name="field-type"]:checked') as HTMLInputElement
      if (_type === null || _type === undefined) {
        const warning = useWarningStore()
        warning.toggleWarningModal()
        warning.message = 'Select a field type and try again.'
        warning.header = 'Field type is a required field.'
        return
      } else {
        switch (_type.value) {
          case 'Text':
            console.log(JSON.stringify(_type.value))
            this.newText = true
            break
          case 'Number':
            console.log(JSON.stringify(_type.value))
            this.newNumber = true
            break
          case 'Item':
            console.log(JSON.stringify(_type.value))
            this.newItem = true
            break
          case 'Formula':
            console.log(JSON.stringify(_type.value))
            this.newFormula = true
            break
        }
        this.getFieldProperties = false
        console.log('bottom of function')
      }
    },
    selectField(_field: any) {
      if (_field.isSelected) {
        _field.isSelected = false
      } else {
        _field.isSelected = true
      }
    },
    getSelectedFields(_section: number) {
      const _array = [] as Array<any>
      for (let i = 0; i < this.form.tabs[this.currentTab].sections[_section].fields.length; ++i) {
        if (this.form.tabs[this.currentTab].sections[_section].fields[i].isSelected) {
          _array.push(i)
        }
      }
      return _array
    },
    getUnselectedFields(_section: number) {
      const _array = [] as Array<any>
      for (let i = 0; i < this.form.tabs[this.currentTab].sections[_section].fields.length; ++i) {
        if (!this.form.tabs[this.currentTab].sections[_section].fields[i].isSelected) {
          _array.push(i)
        }
      }
      return _array
    },
    deselectAllFields() {
      for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
        const _array = this.getSelectedFields(i)
        if (_array.length > 0) {
          for (let yy = 0; yy < _array.length; ++yy) {
            this.form.tabs[this.currentTab].sections[i].fields[_array[yy]].isSelected = false
          }
        }
      }
    },
    addTab() {
      const _name = document.getElementById('tab-name') as HTMLInputElement
      this.form.tabs.push({
        name: _name.value,
        isSelected: false,
        sections: [{ fields: [] }]
      })
    },
    editTab() {
      const _name = document.getElementById('tab-name') as HTMLInputElement
      const field_type = useFieldTypeStore()
      this.form.tabs[this.currentTab].name = _name.value
      field_type.toggleEditTabModal()
    },
    deleteTab() {
      const _deleteChecked = document.getElementsByName('tab') as NodeListOf<HTMLInputElement>
      if (_deleteChecked.length > 0) {
        let yy = 0
        for (let i = 0; i < _deleteChecked.length; ++i) {
          if (_deleteChecked[i].checked) {
            yy++
          }
        }
        if (yy === this.form.tabs.length) {
          const warning = useWarningStore()
          warning.toggleWarningModal()
          warning.message = 'Cannot delete all tabs.'
          warning.header = 'You must have at least one tab.'
          return
        } else {
          let _array = [] as Array<any>
          for (let i = 0; i < _deleteChecked.length; ++i) {
            if (!_deleteChecked[i].checked) {
              _array.push(this.form.tabs[i])
            } else {
              _deleteChecked[i].checked = false
            }
          }
          this.form.tabs = _array
          this.currentTab = 0
          this.tabClicked(this.currentTab, this.currentTab)
          const field_type = useFieldTypeStore()
          field_type.toggleDeleteTabModal()
        }
      }
    },
    addSection(_index: number) {
      this.form.tabs[_index].sections.push({ fields: [] })
    },
    deleteSection() {
      const _deleteChecked = document.getElementsByName(
        'field-section'
      ) as NodeListOf<HTMLInputElement>
      if (_deleteChecked.length > 0) {
        let _array = [] as Array<any>
        for (let i = 0; i < _deleteChecked.length; ++i) {
          if (!_deleteChecked[i].checked) {
            _array.push(this.form.tabs[this.currentTab].sections[i])
          } else {
            _deleteChecked[i].checked = false
          }
        }
        this.form.tabs[this.currentTab].sections = _array
      }
    },
    saveNewField() {
      this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField]
      if (this.newText) {
        const _description = document.getElementById('description') as HTMLInputElement
        const _text = document.getElementById('text') as HTMLInputElement
        const _obj = {
          alignment: this.alignment,
          type: 'text',
          description: _description.value,
          value: _text.value,
          isSelected: false,
          isOn: true
        }
        this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
      } else if (this.newNumber) {
        const _description = document.getElementById('description') as HTMLInputElement
        const _text = document.getElementById('text') as HTMLInputElement
        const _obj = {
          alignment: this.alignment,
          type: 'number',
          description: _description.value,
          value: _text.value,
          isSelected: false,
          isOn: true
        }
        this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
      }
    },
    async saveEditedField() {
      const _currentField =
        this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField]
      if (this.currentSection != this.section) {
        if (this.newText) {
          const _description = document.getElementById('description') as HTMLInputElement
          const _text = document.getElementById('text') as HTMLInputElement
          const _obj = {
            alignment: this.alignment,
            type: 'text',
            description: _description.value,
            value: _text.value,
            isSelected: false,
            isOn: _currentField.isOn
          }
          this.form.tabs[this.currentTab].sections[this.currentSection].fields.splice(
            this.currentField,
            1
          )
          this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
          let sectionsChecked = 0
          for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
            const _array = this.getSelectedFields(i)
            if (_array.length > 0) {
              const field_type = useFieldTypeStore()
              field_type.toggleEditModal()
              setTimeout(() => {
                this.editField()
              }, 500)
              console.log('array length after save ' + _array.length)
            } else {
              sectionsChecked++
              if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
                const field_type = useFieldTypeStore()
                setTimeout(() => {
                  field_type.toggleEditModal()
                  this.closeInputModals()
                }, 500)

                console.log('no more fields to edit')
              }
            }
          }
        } else if (this.newNumber) {
          const _description = document.getElementById('description') as HTMLInputElement
          const _text = document.getElementById('text') as HTMLInputElement
          const _obj = {
            alignment: this.alignment,
            type: 'number',
            description: _description.value,
            value: _text.value,
            isSelected: false,
            isOn: _currentField.isOn
          }
          this.form.tabs[this.currentTab].sections[this.currentSection].fields.splice(
            this.currentField,
            1
          )
          this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
          let sectionsChecked = 0
          for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
            const _array = this.getSelectedFields(i)
            if (_array.length > 0) {
              const field_type = useFieldTypeStore()
              field_type.toggleEditModal()
              setTimeout(() => {
                this.editField()
              }, 500)
              console.log('array length after save ' + _array.length)
            } else {
              sectionsChecked++
              if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
                const field_type = useFieldTypeStore()
                setTimeout(() => {
                  field_type.toggleEditModal()
                  this.closeInputModals()
                }, 500)
                console.log('no more fields to edit')
              }
            }
          }
        }
      } else {
        if (this.newText) {
          const _description = document.getElementById('description') as HTMLInputElement
          const _text = document.getElementById('text') as HTMLInputElement
          const _obj = {
            alignment: this.alignment,
            type: 'text',
            description: _description.value,
            value: _text.value,
            isSelected: false,
            isOn: _currentField.isOn
          }
          this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField] =
            _obj
          let sectionsChecked = 0
          for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
            const _array = this.getSelectedFields(i)
            if (_array.length > 0) {
              const field_type = useFieldTypeStore()
              field_type.toggleEditModal()
              setTimeout(() => {
                this.editField()
              }, 500)
              console.log('array length after save ' + _array.length)
            } else {
              sectionsChecked++
              if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
                const field_type = useFieldTypeStore()
                setTimeout(() => {
                  field_type.toggleEditModal()
                  this.closeInputModals()
                }, 500)

                console.log('no more fields to edit')
              }
            }
          }
        } else if (this.newNumber) {
          const _description = document.getElementById('description') as HTMLInputElement
          const _text = document.getElementById('text') as HTMLInputElement
          const _obj = {
            alignment: this.alignment,
            type: 'number',
            description: _description.value,
            value: _text.value,
            isSelected: false,
            isOn: _currentField.isOn
          }
          this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField] =
            _obj
          let sectionsChecked = 0
          for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
            const _array = this.getSelectedFields(i)
            if (_array.length > 0) {
              const field_type = useFieldTypeStore()
              field_type.toggleEditModal()
              setTimeout(() => {
                this.editField()
              }, 500)
              console.log('array length after save ' + _array.length)
            } else {
              sectionsChecked++
              if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
                const field_type = useFieldTypeStore()
                setTimeout(() => {
                  field_type.toggleEditModal()
                  this.closeInputModals()
                }, 500)
                console.log('no more fields to edit')
              }
            }
          }
        }
      }
    },
    clearFieldTypeVariables() {
      this.alignment = ''
      this.getFieldProperties = true
      this.newType = false
      this.newText = false
      this.newItem = false
      this.newFormula = false
      this.newNumber = false
    },
    deleteField() {
      let sectionsChecked = 0
      for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
        const _array = this.getUnselectedFields(i)
        const _newArray = [] as Array<any>
        if (_array.length > 0) {
          for (let yy = 0; yy < _array.length; ++yy) {
            _newArray.push(this.form.tabs[this.currentTab].sections[i].fields[_array[yy]])
          }
        }
        if (_newArray.length === this.form.tabs[this.currentTab].sections[i].fields.length) {
          sectionsChecked++
          if (
            sectionsChecked === this.form.tabs[this.currentTab].sections.length &&
            i === this.form.tabs[this.currentTab].sections.length - 1
          ) {
            const warning = useWarningStore()
            warning.toggleWarningModal()
            warning.message = 'Select a field and try again.'
            warning.header = 'At least one field must be selected to use the Delete tool.'
          }
        } else if (_newArray != null || _newArray != undefined) {
          console.log(_newArray)
          this.form.tabs[this.currentTab].sections[i].fields = _newArray
        }
      }
    },
    editField() {
      let sectionsChecked = 0
      for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
        const _array = this.getSelectedFields(i)
        if (_array.length > 0) {
          this.currentSection = i
          this.currentField = _array[0]
          const field_type = useFieldTypeStore()
          field_type.toggleEditModal()
          console.log('array length at start = ' + _array.length)
          break
        } else {
          sectionsChecked++
          if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
            const warning = useWarningStore()
            warning.toggleWarningModal()
            warning.message = 'Select a field and try again.'
            warning.header = 'At least one field must be selected to use the Edit tool.'
          }
        }
      }
    },
    copyField() {
      let sectionsChecked = 0
      for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
        const _array = this.getSelectedFields(i)
        if (_array.length > 0) {
          for (let yy = 0; yy < _array.length; ++yy) {
            this.form.tabs[this.currentTab].sections[i].fields.push(
              _.cloneDeep(this.form.tabs[this.currentTab].sections[i].fields[_array[yy]])
            )
            this.form.tabs[this.currentTab].sections[i].fields[
              this.form.tabs[this.currentTab].sections[i].fields.length - 1
            ].isSelected = false
          }
        } else {
          sectionsChecked++
          if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
            const warning = useWarningStore()
            warning.toggleWarningModal()
            warning.message = 'Select a field and try again.'
            warning.header = 'At least one field must be selected to use the Duplicate tool.'
          }
        }
      }
    },
    getMapKeyByValue(_map: Map<number, number>, _index: number) {
      for (let [key, value] of _map.entries()) {
        if (value === _index) {
          return key
        }
      }
    },
    getArrayKeyByValue(_array: Array<any>, _index: number) {
      for (let i = 0; i < _array.length; ++i) {
        if (_array[i] === _index) {
          return i
        }
      }
    }
  }
})
