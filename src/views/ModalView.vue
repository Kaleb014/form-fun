<script setup lang="ts">
import DeleteModal from '../components/Modals/DeleteModal.vue'
import { useAddStore } from '../stores/addClicked'
import { useDeleteStore } from '../stores/deleteClicked'
import { useCopyStore } from '../stores/copyClicked'
import WarningModal from '../components/Modals/WarningModal.vue'
import { useWarningStore } from '../stores/warningStore'
import MenuDropdownModal from '../components/Modals/MenuDropdownModal.vue'
import { useMenuStore } from '../stores/menuClicked'
import { useEditFormStore } from '../stores/editForm'
import FieldTypeModal from '../components/Modals/FieldTypeModal.vue'
import { useFieldTypeStore } from '../stores/FieldTypeStore'
import DeleteSectionModal from '../components/Modals/SectionModals.vue'
import AddTabModal from '../components/Modals/TabModals.vue'
import TabToolsDropdownModal from '../components/Modals/TabToolsDropdownModal.vue'
import { useTabToolsStore } from '../stores/tabToolsClicked'
import FormModalVue from '@/components/Modals/FormModal.vue'
import ColumnsModals from '@/components/Modals/ColumnsModals.vue'
import ActionsModal from '@/components/Modals/ActionsModal.vue'
import { useActionStore } from '@/stores/actionsClicked'

const add_clicked = useAddStore()
const delete_clicked = useDeleteStore()
const copy_clicked = useCopyStore()
const warning = useWarningStore()
const edit_form_clicked = useEditFormStore()
const menu_clicked = useMenuStore()
const tab_tools_clicked = useTabToolsStore()
const field_type = useFieldTypeStore()
const actions_clicked = useActionStore()
</script>

<template>
  <FormModalVue
    v-if="
      add_clicked.addModalActive ||
      edit_form_clicked.editModalActive ||
      copy_clicked.copyModalActive
    "
  />

  <DeleteModal v-if="delete_clicked.deleteModalActive" />

  <TabToolsDropdownModal v-if="tab_tools_clicked.tabToolsModalActive" />

  <FieldTypeModal
    v-if="field_type.addFieldTypeModalActive || field_type.editFieldTypeModalActive"
  />

  <AddTabModal
    v-if="
      field_type.addTabModalActive ||
      field_type.editTabModalActive ||
      field_type.deleteTabModalActive
    "
  />

  <DeleteSectionModal v-if="field_type.deleteSectionModalActive" />

  <ColumnsModals v-if="field_type.addColumnModalActive || field_type.deleteColumnModalActive" />

  <WarningModal v-if="warning.warningModalActive" />

  <MenuDropdownModal v-if="menu_clicked.menuModalActive" />

  <ActionsModal v-if="actions_clicked.actionsModalActive" />
</template>
