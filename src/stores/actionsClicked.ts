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
      console.log('X: ' + this.mouseX + ' ' + 'Y: ' + this.mouseY)
    },
    async toggleModal(_rightClick: boolean) {
      if (this.actionsModalActive && !_rightClick) {
        this.actionsClicked = false
        setTimeout(() => {
          this.actionsModalActive = false
          console.log('modal off')
        }, 700)
      } else {
        this.actionsModalActive = true
        setTimeout(() => {
          this.actionsClicked = true
          console.log('modal on')
        }, 100)
      }
    },
    getTabInfo(_objectType: string, _tab: any, _tabIndex: number){
      this.objectType = _objectType
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    getSectionInfo(_objectType: string, _section: any, _sectionIndex: number, _tabIndex: number){
      this.objectType = _objectType
      this.sectionIndex = _sectionIndex
      this.tabIndex = _tabIndex
      this.actionList = {
        description: [] as Array<string>,
        action: [] as Array<VoidFunction>
      }  as any
      this.setActionList()
    },
    getColumnInfo(_objectType: string, _column: any, _columnIndex: number, _sectionIndex: number, _tabIndex: number){
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
      const field_type = useFieldTypeStore()
      switch (this.objectType) {
        case 'Tab':
          this.actionList.description = [
            'Select All',
            'Copy',
            'Edit',
            'Delete'
          ]
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
          this.actionList.action.push(() => { this.copyColumn() })
          this.actionList.action.push(() => { this.pasteObject('column') })
          this.actionList.action.push(() => { this.deleteColumn() })
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
          this.actionList.action.push(() => { this.copyColumn() })
          this.actionList.action.push(() => { this.pasteObject('field') })
          this.actionList.action.push(() => { this.deleteColumn() })
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
              this.actionList.action.push(() => { this.editField() })
              this.actionList.action.push(() => { this.copyField() })
              this.actionList.action.push(() => { this.deleteField() })
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
              this.actionList.action.push(() => { this.editField() })
              this.actionList.action.push(() => { this.copyField() })
              this.actionList.action.push(() => { this.deleteField() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Number':
              this.actionList.description = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editField() })
              this.actionList.action.push(() => { this.copyField() })
              this.actionList.action.push(() => { this.deleteField() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Formula':
              this.actionList.descriptiont = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editField() })
              this.actionList.action.push(() => { this.copyField() })
              this.actionList.action.push(() => { this.deleteField() })
              this.actionList.action.push(() => { this.toggleField() })
              break
            case 'Item':
              this.actionList.description = [
                'Edit',
                'Copy',
                'Delete',
                'On/Off'
              ]
              this.actionList.action.push(() => { this.editField() })
              this.actionList.action.push(() => { this.copyField() })
              this.actionList.action.push(() => { this.deleteField() })
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
    editField() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isSelected = true
      edit.editField(false)
    },
    copyField() {
      const edit = useEditFormStore()
      sessionStorage.setItem('field', JSON.stringify(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex]))
    },
    deleteField() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isSelected = true
      edit.deleteField()
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
          case 'tab':
            edit.form.tabs.push(_pasteValue)
          break
          case 'section':
            edit.form.tabs[this.tabIndex].sections.push(_pasteValue)
          break
          case 'column':
            if(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.length < 4) {
              edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.push(_pasteValue)
            } else {
              warningStore.toggleWarningModal()
              warningStore.header = 'Select a different section or create a new section for additional columns and fields.'
              warningStore.message = 'Cannot have more than 4 columns per section.'
            }
          break
          case 'field':
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
      for(let i = 0; i < _fields.length; i++) {
        _fields[i].isSelected = true
      }
    },
    deselectAllFields() {
      const edit = useEditFormStore()
      const _fields = edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields
      for(let i = 0; i < _fields.length; i++) {
        _fields[i].isSelected = false
      }
    },
    copyColumn() {
      const edit = useEditFormStore()
      sessionStorage.setItem('column', JSON.stringify(edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex]))
    },
    deleteColumn() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns.splice(this.columnIndex,1)
    },
  }
})
