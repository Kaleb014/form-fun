<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useMenuStore } from '../../stores/menuClicked'

const menu_clicked = useMenuStore()

onMounted(() => {
  document.addEventListener('click', menu_clicked.documentClicked)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', menu_clicked.documentClicked)
})
</script>

<template>
  <div :class="menu_clicked.menuClicked ? 'menu-modal' : 'menu-modal-hidden'">
    <div class="menu-modal-inner">
      <div class="header-row">
        <div class="header-left menu_dropdown">Menu</div>

        <div class="header-right menu_dropdown">
          <button type="button" class="exit-button">ⓧ</button>
        </div>
      </div>

      <div class="scrollable menu_dropdown">
        <div>
          <div class="menu_dropdown"><a href="#">Home</a></div>
          <div class="menu_dropdown"><a href="#">Users</a></div>
          <div class="menu_dropdown"><a href="#">Permissions</a></div>
          <div class="menu_dropdown"><a href="#">Logout</a></div>
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
  background-color: #24252a;
  padding: 4px;
  top: -5.25px;
  right: 16px;
  border-top: 1px solid #4a4c55;
  border-left: 1px solid #4a4c55;
}

.menu-modal-inner {
  max-height: 100vh;
  position: relative;
  height: fit-content;
  width: 100%;
  height: fit-content;
  border: 1px solid #4a4c55;
  background-color: #24252a;
  border-radius: 0.5rem;
  /*border: 1px solid #34353b;
    box-shadow: 2px 6px 6px 2px rgba(0,0, 0, 0.1), 0 2px 4px 2px rgba(0,0, 0, 0.6);*/
}
</style>
