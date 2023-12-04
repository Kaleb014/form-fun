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
import { ref } from 'vue'

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
      isExpanded: false,
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
      newLabel: false,
      getFieldProperties: true,
      indentedChecked: false,
      alignment: '',
      section: 0,
      column: 0,
      currentTab: 0,
      currentSection: 0,
      currentColumn: 0,
      currentField: 0,
      selectionArray: [] as Array<any>,
      editArray: [] as Array<any>,
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
            sections: [{ columns: [{ fields: [] }] }]
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
          sections: [{ columns: [{ fields: [] }] }]
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

    toggleCopyModal() {
      
    },
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
    tabClicked(_oldIndex: number, _newIndex: number) {
      this.form.tabs[_oldIndex].isSelected = false
      this.form.tabs[_newIndex].isSelected = true
    },
    closeInputModals() {
      this.newNumber = false
      this.newText = false
      this.newItem = false
      this.newFormula = false
      this.newLabel = false
    },
    setFieldProperties() {
      //Section/Column
      const _column = document.getElementsByName('field-column') as NodeListOf<HTMLInputElement>
      let _sectionIndex = 0
      let _columnLength = this.form.tabs[this.currentTab].sections[_sectionIndex].columns.length
      let _columnIndex = 0

      for(let i = 0; i <= _column.length; i++) {
        if (i === _column.length) {
          const warning = useWarningStore()
          warning.toggleWarningModal()
          warning.message = 'Select a column and try again.'
          warning.header = 'Column is a required field.'
          return
        } else {
          if(_column[i].checked) {
            this.section = _sectionIndex
            this.column = _columnIndex
            break
          } else {
            if (_columnIndex === _columnLength-1) {
              _columnIndex = 0
              _sectionIndex++
              _columnLength = this.form.tabs[this.currentTab].sections[_sectionIndex].columns.length
            } else {
              _columnIndex++
            }
          }
        }
      }
      //Alignment
      const _alignment = document.querySelector('input[name="field-alignment"]:checked' ) as HTMLInputElement
      if (_alignment === null || _alignment === undefined) {
        this.alignment = ''
      } else if (!_alignment) {
        this.alignment = ''
      } else {
        this.alignment = 'tabbed'
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
          case 'Label':
            this.newLabel = true
            break
          case 'Text':
            this.newText = true
            break
          case 'Number':
            this.newNumber = true
            break
          case 'Item':
            this.newItem = true
            break
          case 'Formula':
            this.newFormula = true
            break
        }
        this.getFieldProperties = false
      }
    },
    selectField(_field: any) {
      if (_field.isSelected) {
        _field.isSelected = false
      } else {
        _field.isSelected = true
      }
    },
    getSelectedFields() {
      const _array = [] as Array<any>
      for(let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
        for(let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
          for (let k = 0; k < this.form.tabs[this.currentTab].sections[i].columns[j].fields.length; k++) {
            if (this.form.tabs[this.currentTab].sections[i].columns[j].fields[k].isSelected) {
              _array.push({
                sections: i,
                columns: j,
                fields: k
              })
            }
          }
        }
      }
      return _array
    },
    getUnselectedFields(_section: number, _column: number) {
      const _array = [] as Array<any>
      for (let i = 0; i < this.form.tabs[this.currentTab].sections[_section].columns[_column].fields.length; ++i) {
        if (!this.form.tabs[this.currentTab].sections[_section].columns[_column].fields[i].isSelected) {
          _array.push(i)
        }
      }
      return _array
    },
    deselectAllFields() {
      const _array = this.getSelectedFields()
      if (_array.length > 0) {
        for (let yy = 0; yy < _array.length; yy++) {
          this.form.tabs[this.currentTab].sections[_array[yy].sections].columns[_array[yy].columns].fields[_array[yy].fields].isSelected = false
        }
      }
    },
    addTab() {
      const _name = document.getElementById('tab-name') as HTMLInputElement
      this.form.tabs.push({
        name: _name.value,
        isSelected: false,
        sections: [{ columns: [{ fields: [] }] }]
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
    addSection() {
      this.form.tabs[this.currentTab].sections.push({ columns: [{ fields: [] }] })
    },
    deleteSection() {
      const _deleteChecked = document.getElementsByName('field-section') as NodeListOf<HTMLInputElement>
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
    getSelectedSection() {
      const _section = document.getElementsByName('section-choice') as NodeListOf<HTMLInputElement>
      const warning = useWarningStore()
      let _array = [] as Array<number>
      
      for (let i = 0; i < _section.length; i++) {
        if(_section[i].checked) {
          _array.push(i)
        }
      }

      switch(_array.length) {
        case 0:
          warning.toggleWarningModal()
          warning.message = 'Select a section and try again.'
          warning.header = 'Cannot create a column without knowing which section to add it to.'           
          break
        case 1:
          this.addColumn(_array[0])
          break
        default:
          warning.toggleWarningModal()
          warning.message = 'Select only one section and try again.'
          warning.header = 'Cannot create a column in more than one section at a time.'
      }
    },
    addColumn(_section: number) {
      if(this.form.tabs[this.currentTab].sections[_section].columns.length < 4) {
        this.form.tabs[this.currentTab].sections[_section].columns.push({ fields: [] })
      } else {
        const warningStore = useWarningStore()
        warningStore.toggleWarningModal()
        warningStore.header = 'Select a different section or create a new section for additional columns and fields.'
        warningStore.message = 'Cannot have more than 4 columns per section.'
      }
      useFieldTypeStore().toggleAddColumnModal()
    },
    deleteColumn() {
      const _deleteChecked = document.getElementsByName('delete-column') as NodeListOf<HTMLInputElement>
      if (_deleteChecked.length > 0) {
        let _index = 0;
        for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
          for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
            if (_deleteChecked[_index].checked) {
              this.form.tabs[this.currentTab].sections[i].columns.splice(j,1)
              j--
            }
            _index++
          }
        }
      }
    },
    saveNewField() {
      if (this.newLabel) {
        const _description = document.getElementById('description') as HTMLInputElement
        const _text = document.getElementById('text') as HTMLInputElement
        const _obj = {
          alignment: this.alignment,
          type: 'label',
          description: _description.value,
          value: _text.value,
          isSelected: false,
          isOn: true
        }
        this.form.tabs[this.currentTab].sections[this.section].columns[this.column].fields.push(_obj)
      } else if (this.newText) {
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
        this.form.tabs[this.currentTab].sections[this.section].columns[this.column].fields.push(_obj)
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
        this.form.tabs[this.currentTab].sections[this.section].columns[this.column].fields.push(_obj)
      }
    },
    saveEditedField() {
      const field_type = useFieldTypeStore()

      // TODO: add save logic to function

      field_type.toggleEditModal()
      this.editField(true)
    },
    // async saveEditedField() {
    //   const _currentField =
    //     this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField]
    //   if (this.currentSection != this.section) {
    //     if (this.newText) {
    //       const _description = document.getElementById('description') as HTMLInputElement
    //       const _text = document.getElementById('text') as HTMLInputElement
    //       const _obj = {
    //         alignment: this.alignment,
    //         type: 'text',
    //         description: _description.value,
    //         value: _text.value,
    //         isSelected: false,
    //         isOn: _currentField.isOn
    //       }
    //       this.form.tabs[this.currentTab].sections[this.currentSection].fields.splice(
    //         this.currentField,
    //         1
    //       )
    //       this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
    //       let sectionsChecked = 0
    //       for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
    //         for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
    //           const _array = this.getSelectedFields(i,j)
    //           if (_array.length > 0) {
    //             const field_type = useFieldTypeStore()
    //             field_type.toggleEditModal()
    //             setTimeout(() => {
    //               this.editField()
    //             }, 500)
    //             console.log('array length after save ' + _array.length)
    //           } else {
    //             sectionsChecked++
    //             if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
    //               const field_type = useFieldTypeStore()
    //               setTimeout(() => {
    //                 field_type.toggleEditModal()
    //                 this.closeInputModals()
    //               }, 500)

    //               console.log('no more fields to edit')
    //             }
    //           }
    //         }
    //       }
    //     } else if (this.newNumber) {
    //       const _description = document.getElementById('description') as HTMLInputElement
    //       const _text = document.getElementById('text') as HTMLInputElement
    //       const _obj = {
    //         alignment: this.alignment,
    //         type: 'number',
    //         description: _description.value,
    //         value: _text.value,
    //         isSelected: false,
    //         isOn: _currentField.isOn
    //       }
    //       this.form.tabs[this.currentTab].sections[this.currentSection].fields.splice(
    //         this.currentField,
    //         1
    //       )
    //       this.form.tabs[this.currentTab].sections[this.section].fields.push(_obj)
    //       let sectionsChecked = 0
    //       for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
    //         for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
    //           const _array = this.getSelectedFields(i,j)
    //           if (_array.length > 0) {
    //             const field_type = useFieldTypeStore()
    //             field_type.toggleEditModal()
    //             setTimeout(() => {
    //               this.editField()
    //             }, 500)
    //             console.log('array length after save ' + _array.length)
    //           } else {
    //             sectionsChecked++
    //             if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
    //               const field_type = useFieldTypeStore()
    //               setTimeout(() => {
    //                 field_type.toggleEditModal()
    //                 this.closeInputModals()
    //               }, 500)
    //               console.log('no more fields to edit')
    //             }
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     if (this.newText) {
    //       const _description = document.getElementById('description') as HTMLInputElement
    //       const _text = document.getElementById('text') as HTMLInputElement
    //       const _obj = {
    //         alignment: this.alignment,
    //         type: 'text',
    //         description: _description.value,
    //         value: _text.value,
    //         isSelected: false,
    //         isOn: _currentField.isOn
    //       }
    //       this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField] =
    //         _obj
    //       let sectionsChecked = 0
    //       for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
    //         for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
    //           const _array = this.getSelectedFields(i,j)
    //           if (_array.length > 0) {
    //             const field_type = useFieldTypeStore()
    //             field_type.toggleEditModal()
    //             setTimeout(() => {
    //               this.editField()
    //             }, 500)
    //             console.log('array length after save ' + _array.length)
    //           } else {
    //             sectionsChecked++
    //             if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
    //               const field_type = useFieldTypeStore()
    //               setTimeout(() => {
    //                 field_type.toggleEditModal()
    //                 this.closeInputModals()
    //               }, 500)

    //               console.log('no more fields to edit')
    //             }
    //           }
    //         }
    //       }
    //     } else if (this.newNumber) {
    //       const _description = document.getElementById('description') as HTMLInputElement
    //       const _text = document.getElementById('text') as HTMLInputElement
    //       const _obj = {
    //         alignment: this.alignment,
    //         type: 'number',
    //         description: _description.value,
    //         value: _text.value,
    //         isSelected: false,
    //         isOn: _currentField.isOn
    //       }
    //       this.form.tabs[this.currentTab].sections[this.currentSection].fields[this.currentField] =
    //         _obj
    //       let sectionsChecked = 0
    //       for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; ++i) {
    //         for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
    //           const _array = this.getSelectedFields(i,j)
    //           if (_array.length > 0) {
    //             const field_type = useFieldTypeStore()
    //             field_type.toggleEditModal()
    //             setTimeout(() => {
    //               this.editField()
    //             }, 500)
    //             console.log('array length after save ' + _array.length)
    //           } else {
    //             sectionsChecked++
    //             if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
    //               const field_type = useFieldTypeStore()
    //               setTimeout(() => {
    //                 field_type.toggleEditModal()
    //                 this.closeInputModals()
    //               }, 500)
    //               console.log('no more fields to edit')
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
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
      for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
        for (let j = 0; j < this.form.tabs[this.currentTab].sections[i].columns.length; j++) {
          const _array = this.getUnselectedFields(i,j)
          const _newArray = [] as Array<any>
          if (_array.length > 0) {
            for (let yy = 0; yy < _array.length; ++yy) {
              _newArray.push(this.form.tabs[this.currentTab].sections[i].columns[j].fields[_array[yy]])
            }
          }
          if (_newArray.length === this.form.tabs[this.currentTab].sections[i].columns[j].fields.length) {
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
            this.form.tabs[this.currentTab].sections[i].columns[j].fields = _newArray
          }
        }
      }
    },
    editField(isLoop: boolean) {
      const field_type = useFieldTypeStore()

      if(isLoop) {
        switch(this.editArray.length) {
          case 0:
            field_type.toggleEditModal()
            break
          case 1:
            this.currentSection = this.editArray[0].sections
            this.currentColumn = this.editArray[0].columns
            this.currentField = this.editArray[0].fields
            this.editArray = [] as Array<any>
            field_type.toggleEditModal()
            break
          default:
            this.currentSection = this.editArray[0].sections
            this.currentColumn = this.editArray[0].columns
            this.currentField = this.editArray[0].fields
            this.editArray.splice(0,1)
            field_type.toggleEditModal()
        }
      } else {
        this.editArray = this.getSelectedFields();

        switch(this.editArray.length) {
          case 0:
            const warning = useWarningStore()
            warning.toggleWarningModal()
            warning.message = 'Select a field and try again.'
            warning.header = 'At least one field must be selected to use the Edit tool.'
            break
          case 1:
            this.currentSection = this.editArray[0].sections
            this.currentColumn = this.editArray[0].columns
            this.currentField = this.editArray[0].fields
            this.editArray = [] as Array<any>
            field_type.toggleEditModal()
            break
          default:
            this.currentSection = this.editArray[0].sections
            this.currentColumn = this.editArray[0].columns
            this.currentField = this.editArray[0].fields
            this.editArray.splice(0,1)
            field_type.toggleEditModal()
        }
      }
      // let sectionsChecked = 0
      // for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
      //   const _array = this.getSelectedFields()
      //   if (_array.length > 0) {
      //     this.currentSection = i
      //     this.currentField = _array[0]
      //     const field_type = useFieldTypeStore()
      //     field_type.toggleEditModal()
      //     console.log('array length at start = ' + _array.length)
      //     break
      //   } else {
      //     sectionsChecked++
      //     if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
      //       const warning = useWarningStore()
      //       warning.toggleWarningModal()
      //       warning.message = 'Select a field and try again.'
      //       warning.header = 'At least one field must be selected to use the Edit tool.'
      //     }
      //   }
      // }
    },
    copyField() {
      const _array = this.getSelectedFields()
      if(_array.length > 0) {
        for (let i = 0; i < _array.length; i++) {
          this.form.tabs[this.currentTab].sections[_array[i].sections].columns[_array[i].columns].fields.push(
            _.cloneDeep(this.form.tabs[this.currentTab].sections[_array[i].sections].columns[_array[i].columns].fields[_array[i].fields]))
  
            this.form.tabs[this.currentTab].sections[_array[i].sections].columns[_array[i].columns].
            fields[this.form.tabs[this.currentTab].sections[_array[i].sections].fields.length - 1].isSelected = false
        }
      } else {
        const warning = useWarningStore()
        warning.toggleWarningModal()
        warning.message = 'Select a field and try again.'
        warning.header = 'At least one field must be selected to use the Duplicate tool.'
      }
      // let sectionsChecked = 0
      // for (let i = 0; i < this.form.tabs[this.currentTab].sections.length; i++) {
      //   const _array = this.getSelectedFields()
      //   if (_array.length > 0) {
      //     for (let yy = 0; yy < _array.length; ++yy) {
      //       this.form.tabs[this.currentTab].sections[i].fields.push(
      //         _.cloneDeep(this.form.tabs[this.currentTab].sections[i].fields[_array[yy]])
      //       )
      //       this.form.tabs[this.currentTab].sections[i].fields[
      //         this.form.tabs[this.currentTab].sections[i].fields.length - 1
      //       ].isSelected = false
      //     }
      //   } else {
      //     sectionsChecked++
      //     if (sectionsChecked === this.form.tabs[this.currentTab].sections.length) {
      //       const warning = useWarningStore()
      //       warning.toggleWarningModal()
      //       warning.message = 'Select a field and try again.'
      //       warning.header = 'At least one field must be selected to use the Duplicate tool.'
      //     }
      //   }
      // }
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
