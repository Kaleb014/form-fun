<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAddStore } from '../stores/addClicked'
import { useCopyStore } from '../stores/copyClicked'
import { useDeleteStore } from '../stores/deleteClicked'
import { useSortStore } from '../stores/sortStore'
import { useFormStore } from '../stores/formsArray'
import { useSelectAllStore } from '../stores/selectAllClicked'
import { useEditStore } from '../stores/editClicked'
import { useSelectionStore } from '../stores/selectionMap'
import { useSortClickedStore } from '../stores/sortClicked'

const add_clicked = useAddStore()
const delete_clicked = useDeleteStore()
const copy_clicked = useCopyStore()
const edit_clicked = useEditStore()
const sort_clicked = useSortClickedStore()
const select_all = useSelectAllStore()
const selection_map = useSelectionStore()
const form_sort = useSortStore()
const forms_array = useFormStore()

sort_clicked.$onAction(({ after }) => {
  after(() => {
    if (!add_clicked.addModalActive) {
      forms_array.clearSelectionList(selection_map.selectionMap, true)
      forms_array.forms = forms_array.sortForms(true)
    }
  })
})

select_all.$onAction(({ after }) => {
  after(() => {
    if (!add_clicked.addModalActive) {
      forms_array.selectAllForms(selection_map.selectionMap, forms_array.forms)
    }
  })
})

delete_clicked.$onAction(({ after }) => {
  after(() => {
    if (delete_clicked.deleteClicked === true) {
      forms_array.deleteFormsClicked(selection_map.selectionMap)
    }
    if (delete_clicked.deleteSelection === true) {
      forms_array.deleteForms(selection_map.selectionMap, forms_array.forms)
    }
  })
})

copy_clicked.$onAction(({ after }) => {
  after(() => {
    if (copy_clicked.copyClicked === true) {
      forms_array.copyClicked(selection_map.selectionMap)
    }
  })
})

onMounted(() => {
  add_clicked.addModalActive = false
  delete_clicked.deleteModalActive = false
  copy_clicked.copyModalActive = false
  edit_clicked.editModalActive = false
  form_sort.loadSortGrid()
  forms_array.loadGrid()
  forms_array.sortForms(false)
  selection_map.loadMap()
  forms_array.clearSelectionList(selection_map.selectionMap)
})

onUnmounted(() => {
  forms_array.clearSelectionList(selection_map.selectionMap)
})
</script>

<template>
  <div>
    <div class="body">
      <div class="container">
        <div class="container-inner">
          <div class="scrollable">
            <table id="Table">
              <tr>
                <th id="Checkbox" class="pointer" @click="select_all.selectAllClicked()">✔</th>

                <th
                  id="FormName"
                  @click="form_sort.sortStore[0].column = 'FormName'; sort_clicked.sortClicked()"
                >
                  <div class="column">
                    Description
                    <div class="arrow" v-show="form_sort.sortStore[0].column === 'FormName'">
                      &emsp;
                      <img
                        src="../assets/arrow-up-icon-export.png"
                        width="12"
                        height="8"
                        v-show="form_sort.sortStore[0].state === 1"
                      />
                      <img
                        src="../assets/arrow-down-icon-export.png"
                        width="12"
                        height="8"
                        v-show="form_sort.sortStore[0].state === 2"
                      />
                    </div>
                  </div>
                </th>
                <th
                  id="FormDate"
                  @click="form_sort.sortStore[0].column = 'FormDate'; sort_clicked.sortClicked()"
                >
                  <div class="column">
                    Date Created
                    <div class="arrow" v-show="form_sort.sortStore[0].column === 'FormDate'">
                      &emsp;
                      <img
                        src="../assets/arrow-up-icon-export.png"
                        width="12"
                        height="8"
                        v-show="form_sort.sortStore[0].state === 1"
                      />
                      <img
                        src="../assets/arrow-down-icon-export.png"
                        width="12"
                        height="8"
                        v-show="form_sort.sortStore[0].state === 2"
                      />
                    </div>
                  </div>
                </th>
              </tr>
              <tr v-for="(form, index) in form_sort.filteredForms" :key="index" class="hoverable">
                <td id="Checkbox">
                  <label class="switch">
                    <input  name="checkboxes" v-model="form.isSelected" class="pointer"  type="checkbox" @click="forms_array.selectForm(form, index)" />
                    <span class="slider"></span>
                  </label>
                </td>
                <td class="text-left">
                  <a class="FormLink" @click="forms_array.editForm(form, index)">{{ form.content }}</a>
                </td>
                <td class="text-center">
                  <a>{{ form.dateCreated }}</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
table {
  width: 100%;
  margin: 0;
  top: 0;
  left: 0;
  text-align: center;
}
table th {
  text-align: center;
  background-color: #4a4c55;
  padding: 2px 0px 2px 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #5f616d;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
table th:hover {
  background-color: rgba(88, 95, 97, 0.5);
  border: 1px solid #4a4c55;
}
table td {
  border: 1px solid #4a4c55;
  padding: 4px 8px;
  border-right: none;
  border-left: none;
  border-top: none;
}
table tr th:nth-child(1) {
  max-width: fit-content;
  min-width: 45px;
  width: 45px;
}
table tr th:nth-child(2) {
  max-width: fit-content;
  min-width: 400px;
}
table tr th:nth-child(3) {
  max-width: fit-content;
  min-width: 200px;
  width: 200px;
}
input {
  background-color: var(--input-background);
  color: #edf0f1;
  border-style: none;
}
input:focus {
  outline: none;
}

.group-elements {
  display: flex;
}
.FormLink:hover {
  color: rgba(88, 95, 97, 1);
  cursor: pointer;
}
.FormLink {
  cursor: default;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.container {
  display: flex;
  width: 100vw;
  height: calc(100vh - 140px);
  height: -o-calc(100vh - 140px); /* opera */
  height: -webkit-calc(100vh - 140px); /* google, safari */
  height: -moz-calc(100vh - 140px); /* firefox */
}
.container-inner {
  display: flex;
  height: 100%;
  width: 100%;
}
.scrollable {
  width: 100%;
  overflow: auto;
  background-color: #24252a;
}
.column {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
.arrow {
  display: flex;
  align-items: center;
}
.hoverable:hover {
  background-color: #1a1b1f69;
}
</style>
