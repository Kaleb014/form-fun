import { defineStore } from 'pinia'

export const useActionStore = defineStore('actionClicked', {
  state: () => {
    return { 
      actionsModalActive: false, 
      actionsClicked: false, 
      mouseX: -1, 
      mouseY: -1,
      actionList: {
        description: [],
        action: []
      },
      field: [],
      isTab: false,
      isSection: false,
      isColumn: false,
      isField: false,
      objectType: '',
      tabIndex: 0,
      sectionIndex: 0,
      columnIndex: 0,
      fieldIndex: 0,
      fieldType: ''
    }
  },
  actions: {
    documentClicked(e: any) {
      if (!e.target.matches('.action_list')) {
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
    getFieldInfo(_objectType: string, _fieldType: string, _fieldIndex: number, 
      _columnIndex: number, _sectionIndex: number, _tabIndex: number) {
      this.objectType = _objectType
      this.fieldType = _fieldType
      this.fieldIndex = _fieldIndex
      this.columnIndex = _columnIndex
      this.sectionIndex = _sectionIndex
      this.tabIndex = _tabIndex
    },
    setActionList() {
      switch (this.fieldType) {
        case 'label':
          this.actionList = [
            'Edit',
            'Copy',
            'Delete',
            'On/Off'
          ]
          break
        case 'text':
          this.actionList.description = [
            'Resize',
            'Edit',
            'Copy',
            'Delete',
            'On/Off'
          ]
          for(let i = 0; i < this.actionList.length; i++){
            console.log(this.actionList.description[i])
          }
          break
        case 'number':
          this.actionList = [
            'Edit',
            'Copy',
            'Delete',
            'On/Off'
          ]
          break
        case 'formula':
          this.actionList = [
            'Edit',
            'Copy',
            'Delete',
            'On/Off'
          ]
          break
        case 'item':
          this.actionList = [
            'Edit',
            'Copy',
            'Delete',
            'On/Off'
          ]
          break
        default:
          break
      }
    },
    copyField() {
      //this should probably going in formedit store
    },
  }
})
