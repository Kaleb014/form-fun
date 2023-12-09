import { defineStore } from 'pinia'
import { useEditFormStore } from './editForm'
import { ref } from 'vue'

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
            'Copy',
            'Edit',
            'Delete'
          ]
          break
        case 'Column':
          this.actionList.description = [
            'Select All',
            'Copy',
            'Edit',
            'Delete'
          ]
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
      console.log("Copy field")
    },
    deleteField() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isSelected = true
      edit.deleteField()
    },
    toggleField() {
      const edit = useEditFormStore()
      edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isOn = !edit.form.tabs[this.tabIndex].sections[this.sectionIndex].columns[this.columnIndex].fields[this.fieldIndex].isOn
    }
  }
})
