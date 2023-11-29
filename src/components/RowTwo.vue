<script setup lang="ts">
import AddButton from './Buttons/AddButton.vue'
import CopyButton from './Buttons/CopyButton.vue'
import DeleteButton from './Buttons/DeleteButton.vue'
import SearchBar from './SearchBar.vue'
</script>

<template>
  <div class="row_two tab-row">
    <div class="input_form">
      <SearchBar />
    </div>

    <div class="nav_button_container">
      <div class="medium-command-button">
        <DeleteButton />
        <CopyButton />
        <AddButton />
      </div>
    </div>
  </div>
</template>
