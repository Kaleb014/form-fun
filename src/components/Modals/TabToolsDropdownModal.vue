<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTabToolsStore } from '../../stores/tabToolsClicked'
//TODO: Think I just want to scrap this component...
const tabs_clicked = useTabToolsStore()

onMounted(() => {
  document.addEventListener('click', tabs_clicked.documentClicked)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', tabs_clicked.documentClicked)
})
</script>

<template>
  <div :class="tabs_clicked.tabsClicked ? 'menu-modal' : 'menu-modal-hidden'">
    <div class="menu-modal-inner">
      <div class="header-row">
        <div class="header-left tabs_dropdown">Tab Tools</div>

        <div class="header-right tabs_dropdown">
          <button type="button" class="exit-button">ⓧ</button>
        </div>
      </div>

      <div class="scrollable tabs_dropdown">
        <div>
          <div class="tabs_dropdown"><a>Delete Tab(s)</a></div>
          <div class="tabs_dropdown"><a>Edit Tab(s)</a></div>
          <div class="tabs_dropdown"><a>Add Tab</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  position: relative;
  height: 275px;
  top: 0;
  border-radius: 0.5rem;
  transition: all 0.75s ease-in-out;
  transform: translateY(0);
}

.menu-modal {
  display: flex;
  justify-content: right;
  max-width: 640px;
  height: 275px;
  top: 0;
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
  right: calc(10% - 4px);
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
}

.menu-modal-inner {
  max-height: 100vh;
  position: relative;
  height: fit-content;
  width: 100%;
  height: 275px;
  border: 1px solid var(--border-color);
  background-color: var(--dark-grey);
  border-radius: 0.5rem;
  /*border: 1px solid #34353b;
    box-shadow: 2px 6px 6px 2px rgba(0,0, 0, 0.1), 0 2px 4px 2px rgba(0,0, 0, 0.6);*/
}
</style>
