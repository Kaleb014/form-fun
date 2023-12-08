<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useActionStore } from '../../stores/actionsClicked'

const actions_clicked = useActionStore()

onMounted(() => {
  document.addEventListener('click', actions_clicked.documentClicked)
  document.addEventListener('contextmenu', actions_clicked.documentClicked)
  actions_clicked.setActionList()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', actions_clicked.documentClicked)
  document.removeEventListener('contextmenu', actions_clicked.documentClicked)
})
</script>

<template>
  <div class="action_menu_location action_list" :style="{ 'left': actions_clicked.mouseX-19 + 'px', 'top': actions_clicked.mouseY+12 + 'px' }">
    <div :class="actions_clicked.actionsClicked ? 'action_menu' : 'action_menu_hidden'">
      <div class="menu-modal-inner">
        <div class="header-row">
          <div class="header-left menu_dropdown">Actions</div>

          <div class="header-right menu_dropdown">
            <button type="button" class="exit-button">ⓧ</button>
          </div>
        </div>

        <div class="scrollable menu_dropdown">
          <div>
            <div class="menu_dropdown">
              <span 
              class="items"
              v-for="listItem in actions_clicked.actionList.description" :key="listItem">
                {{listItem}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action_menu_location {
  position: absolute;
  width: 125px;
}
.action_menu_hidden {
  transition: all 0.5s ease-in-out;
  opacity: 0;
  visibility: hidden;
  margin-top: 4px;
}

.items {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 2px;
}

.items:hover {
  color: var(--text-hover);
}

.action_menu {
  margin-top: 4px;
  height: 100%;
  transition: all 0.5s ease-in-out;
  opacity: 100;
}





a {
  padding: 2px;
}
a:hover {
  color: rgba(88, 95, 97, 1);
}

.menu-modal-hidden {
  display: flex;
  justify-content: right;
  max-width: 640px;
  position: fixed;
  height: 275px;
  top: -350px;
  right: 15px;
  border-radius: 0.5rem;
  transition: all 0.75s ease-in-out;
  transform: translateY(0);
}

.menu-modal {
  display: flex;
  justify-content: right;
  max-width: 640px;
  position: fixed;
  height: 275px;
  top: 46px;
  right: 14px;
  border-radius: 0.5rem;
  transition: all 0.75s ease-in-out;
  transform: translateY(0);
}

.menu-modal-inner::after {
  content: '';
  position: absolute;
  transform: rotate(45deg);
  background-color: var(--dark-grey);
  padding: 4px;
  top: -5.25px;
  left: 16px;
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
}

.menu-modal-inner {
  max-height: 100vh;
  position: relative;
  height: fit-content;
  width: 100%;
  height: fit-content;
  border: 1px solid var(--border-color);
  background-color: var(--dark-grey);
  border-radius: 0.5rem;
  /*border: 1px solid #34353b;
    box-shadow: 2px 6px 6px 2px rgba(0,0, 0, 0.1), 0 2px 4px 2px rgba(0,0, 0, 0.6);*/
}
</style>
