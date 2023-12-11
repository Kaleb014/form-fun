import { defineStore } from 'pinia'
import { useEditFormStore } from './editForm'
import { ref } from 'vue'
import { useFieldTypeStore } from './FieldTypeStore'
import { useWarningStore } from './warningStore'

export const useActionStore = defineStore('actionClicked', {
  state: () => {
    return { 
      actionsModalActive: ref(false), 
      actionsClicked: ref(false), 
      mouseX: ref(-1), 
      mouseY: ref(-1),
      actionList: ref({
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      })  as any,
      field: ref([]),
      isTab: ref(false),
      isSection: ref(false),
      isColumn: ref(false),
      isField: ref(false),
      objectType: ref(''),
      tabIndex: ref(0),
      sectionIndex: ref(0),
      columnIndex: ref(0),
      fieldIndex: ref(0),
      fieldType: ref('')
    }
  },
  actions: {
    rightClickManager(e: any, _objectType: string, _field: any, _column: any,
      _section: any, _tab: any, _fieldIndex: number, _fieldType: string, 
      _columnIndex: number, _sectionIndex: number, _tabIndex: number) {

      this.getMousePosition(e)
      switch(_objectType) {
        case 'Form':
          this.getFormInfo(_objectType)
          this.toggleModal(true)
          break
        case 'Tab':
          this.getTabInfo(_objectType, _tab, _tabIndex)
          this.toggleModal(true)
          break
        case 'Section':
          this.getSectionInfo(_objectType, _section, _sectionIndex, _tabIndex)
          this.toggleModal(true)
          break
        case 'Column':
          this.getColumnInfo(_objectType, _column, _columnIndex, _sectionIndex, _tabIndex)
          this.toggleModal(true)
          break
        case 'Field':
          this.getFieldInfo(_objectType, _fieldType, _field, _fieldIndex, _columnIndex,
            _sectionIndex, _tabIndex)
          this.toggleModal(true)
          break
        default:
          return
      }
    },
    documentClicked(e: any) {
      if (!e.target.matches('.action_list')) {
        this.toggleModal(false)
      }
    },
    documentRightClicked(e: any) {
      if (!e.target.matches('.right_click_area')) {
        this.toggleModal(false)
      }
    },
    getMousePosition(e: any) {
      this.mouseX = e.pageX
      this.mouseY = e.pageY
    },
    async toggleModal(_rightClick: boolean) {
      if (this.actionsModalActive && !_rightClick) {
        this.actionsClicked = false
        setTimeout(() => {
          this.actionsModalActive = false
        }, 200)
      } else {
        this.actionsModalActive = true
        setTimeout(() => {
          this.actionsClicked = true
        }, 100)
      }
    },
    getFormInfo(_objectType: string) {
      this.objectType = _objectType
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      } as any
      this.setActionList()
    },
    getTabInfo(_objectType: string, _tab: any, _tabIndex: number) {
      this.objectType = _objectType
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    getSectionInfo(_objectType: string, _section: any, _sectionIndex: number, _tabIndex: number) {
      this.objectType = _objectType
      this.sectionIndex = _sectionIndex
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    getColumnInfo(_objectType: string, _column: any, _columnIndex: number, _sectionIndex: number, _tabIndex: number) {
      this.objectType = _objectType
      this.columnIndex = _columnIndex
      this.sectionIndex = _sectionIndex
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    getFieldInfo(_objectType: string, _fieldType: string, _field: any, _fieldIndex: number, 
      _columnIndex: number, _sectionIndex: number, _tabIndex: number) {
      this.objectType = _objectType
      this.fieldType = _fieldType
      this.field = _field
      this.fieldIndex = _fieldIndex
      this.columnIndex = _columnIndex
      this.sectionIndex = _sectionIndex
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    setActionList() {
      const edit = useEditFormStore()

      switch (this.objectType) {
        case 'Form':
          this.actionList.description = [
            'Paste'
          ]
          this.actionList.action.push(() => { this.pasteObject('Tab') })
          break
        case 'Tab':
          this.actionList.description = [
            'Select All',
            'Deselect All',
            'Copy',
            'Edit',
            'Paste',
            'Delete'
          ]
          const field_type = useFieldTypeStore()
          this.actionList.action.push(() => { this.selectAllFields() })
          this.actionList.action.push(() => { this.deselectAllFields() })
          this.actionList.action.push(() => { this.copyObject() })
          this.actionList.action.push(() => { this.editObject() })
          this.actionList.action.push(() => { this.pasteObject('Section') })
          this.actionList.action.push(() => { this.deleteObject() })
          break
        case 'Section':
          this.actionList.description = [
            'Select All',
            'Deselect All',
            'Copy',
            'Paste',
            'Delete'
          ]
          this.actionList.action.push(() => { this.selectAllFields() })
          this.actionList.action.push(() => { this.deselectAllFields() })
          this.actionList.action.push(() => { this.copyObject() })
          this.actionList.action.push(() => { this.pasteObject('Column') })
          this.actionList.action.push(() => { this.deleteObject() })
          break
        case 'Column':
          this.actionList.description = [
            'Select All',
            'Deselect All',
            'Copy',
            'Paste',
            'Delete'
          ]
          this.actionList.action.push(() => { this.selectAllFields() })
          this.actionList.action.push(() => { this.deselectAllFields() })
          this.actionList.action.push(() => { this.copyObject() })
          this.actionList.action.push(() => { this.pasteObject('Field') })
          this.actionList.action.push(() => { this.deleteObject() })
          break
        case 'Field':
          switch (this.fieldType) {
            case 'Label':
              this.actionList.description = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editObject() })
              this.actionList.action.push(() => { this.copyObject() })
              this.actionList.action.push(() => { this.deleteObject() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Text':
              this.actionList.description = [
                'Resize',
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { edit.saveFieldDimensions(this.field, this.fieldIndex, this.sectionIndex, this.columnIndex) })
              this.actionList.action.push(() => { this.editObject() })
              this.actionList.action.push(() => { this.copyObject() })
              this.actionList.action.push(() => { this.deleteObject() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Number':
              this.actionList.description = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editObject() })
              this.actionList.action.push(() => { this.copyObject() })
              this.actionList.action.push(() => { this.deleteObject() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Formula':
              this.actionList.descriptiont = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editObject() })
              this.actionList.action.push(() => { this.copyObject() })
              this.actionList.action.push(() => { this.deleteObject() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Item':
              this.actionList.description = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editObject() })
              this.actionList.action.push(() => { this.copyObject() })
              this.actionList.action.push(() => { this.deleteObject() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            default:
              break
          }
          break
        default:
          break
      }
    },
    deleteObject() {
      const edit = useEditFormStore()
      const warningStore = useWarningStore()
      switch(this.objectType){
        case 'Tab':
          if(edit.form.tabs.length === 1) {
            warningStore.toggleWarningModal()
            warningStore.header = 'You cannot have zero tabs, create a new tab before deleting this one.'
            warningStore.message = 'You need at least one tab!'
          } else {
            edit.form.tabs.splice(this.tabIndex,1)
          }
          break
        case 'Section':
          edit.form.tabs[this.tabIndex].sections.splice(this.sectionIndex,1)
          break
        case 'Column':
          edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.splice(this.columnIndex,1)
          break
        case 'Field':
          edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields.splice(this.fieldIndex,1)
          break
        default:
          break
      }
    },
    toggleField() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isOn = !edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isOn
    },
    pasteObject(_objectType: string) {
      const edit = useEditFormStore()
      const warningStore = useWarningStore()
      const _value = sessionStorage.getItem(_objectType)
      if(_value === null || _value === undefined) {
        return
      } else {
        const _pasteValue = JSON.parse(_value)
        switch(_objectType){
          case 'Tab':
            edit.form.tabs.push(_pasteValue)
            break
          case 'Section':
            edit.form.tabs[this.tabIndex].sections.push(_pasteValue)
            break
          case 'Column':
            if(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.length < 4) {
              edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.push(_pasteValue)
            } else {
              warningStore.toggleWarningModal()
              warningStore.header = 'Select a different section or create a new section for additional columns and fields.'
              warningStore.message = 'Cannot have more than 4 columns per section.'
            }
            break
          case 'Field':
            edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields.push(_pasteValue)
            break
          default:
          break
        }
      }
    },
    selectAllFields() {
      const edit = useEditFormStore()
      const _fields = edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields

      switch(this.objectType){
        case 'Tab':
          for(let i = 0; i < edit.form.tabs[this.tabIndex].sections.length; i++) {
            for(let j = 0; j < edit.form.tabs[this.tabIndex].sections[i].columns.length; j++) {
              for(let k = 0; k < edit.form.tabs[this.tabIndex].sections[i].columns[j].fields.length; k++) {
                edit.form.tabs[this.tabIndex].sections[i].columns[j].fields[k].isSelected = true
              }
            }
          }
          break
        case 'Section':
          for(let i = 0; i < edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.length; i++) {
            for(let j = 0; j < edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[i].fields.length; j++) {
              edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[i].fields[j].isSelected = true
            }
          }
          break
        case 'Column':
          for(let i = 0; i < _fields.length; i++) {
            _fields[i].isSelected = true
          }
          break
        default:
          break
      }
    },
    deselectAllFields() {
      const edit = useEditFormStore()
      const _fields = edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields

      switch(this.objectType){
        case 'Tab':
          for(let i = 0; i < edit.form.tabs[this.tabIndex].sections.length; i++) {
            for(let j = 0; j < edit.form.tabs[this.tabIndex].sections[i].columns.length; j++) {
              for(let k = 0; k < edit.form.tabs[this.tabIndex].sections[i].columns[j].fields.length; k++) {
                edit.form.tabs[this.tabIndex].sections[i].columns[j].fields[k].isSelected = false
              }
            }
          }
          break
        case 'Section':
          for(let i = 0; i < edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.length; i++) {
            for(let j = 0; j < edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[i].fields.length; j++) {
              edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[i].fields[j].isSelected = false
            }
          }
          break
        case 'Column':
          for(let i = 0; i < _fields.length; i++) {
            _fields[i].isSelected = false
          }
          break
        default:
          break
      }
    },
    copyObject() {
      const edit = useEditFormStore()
      switch(this.objectType){
        case 'Tab':
          sessionStorage.setItem('Tab', JSON.stringify(edit.form.tabs[this.tabIndex]))
          break
        case 'Section':
          sessionStorage.setItem('Section', JSON.stringify(edit.form.tabs[this.tabIndex].sections[this.sectionIndex]))
          break
        case 'Column':
          sessionStorage.setItem('Column', JSON.stringify(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex]))
          break
        case 'Field':
          sessionStorage.setItem('Field', JSON.stringify(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex]))
          break
        default:
          break
      }
    },
    editObject() {
      const edit = useEditFormStore()

      switch(this.objectType) {
        case 'Tab':
          const field_type = useFieldTypeStore()
          field_type.tabIndex = this.tabIndex; 
          field_type.toggleEditTabModal()
          break
        case 'Field':
          edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isSelected = true
          edit.editField(false)
          break
        default:
          return
      }
    }
  }
})
