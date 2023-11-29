<script setup>
import { useSaveStore } from '../../stores/saveClicked'

const already_exists = useSaveStore()
</script>

<template>
  <div class="modal" v-if="already_exists.alreadyExistsModalActive">
    <div class="modal-inner" v-if="already_exists.alreadyExistsModalActive">
      <div>
        <section>
          <h1>{{ already_exists.uppercaseItem }} Already Exists!</h1>
          <p>
            {{ already_exists.aOrAn }} {{ already_exists.lowercaseItem }} with the same name already
            exists, please enter a unique name and try again.
          </p>

          <div class="small-body-button">
            <div class="modal_lower_button">
              <button type="button" @click="already_exists.toggleModal()">OK</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: #4a4c55;
  color: #edf0f1;
  border-style: none;
}

input:focus {
  outline: none;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #4a4c5581;
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 80%;
  box-shadow:
    5px 5px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
  padding: 16px 16px;
  background-color: #1a1b1f;
  border-radius: 0.5rem;
}

.modal_lower_button {
  display: flex;
  position: relative;
  justify-content: right;
}

.modal-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

h1,
p {
  margin-bottom: 16px;
}

h1 {
  font-size: 32px;
}

p {
  font-size: 18px;
}
</style>
