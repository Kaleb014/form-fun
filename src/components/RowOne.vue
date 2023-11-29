<script setup lang="ts">
import MenuDropdown from './Buttons/MenuDropdown.vue'
</script>

<template>
  <div class="row_one">
    <img
      alt="Estimator logo"
      class="logo"
      src="../assets/text-document-line-icon-export.png"
      width="40"
      height="48"
    />

    <div class="menu_container" id="menu_conainter_id">
      <div class="medium_button">
        <MenuDropdown />
      </div>
    </div>
  </div>
</template>
