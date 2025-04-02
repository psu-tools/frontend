<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modal.isOpen" class="popup-overlay" @click="modal.closeModal">
        <div class="popup-content" @click.stop>
          <button class="close-btn" @click="modal.closeModal">×</button>
          <h2>{{ modal.tripData }}</h2>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useModalStore } from '~/stores/modal'

const modal = useModalStore()
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.popup-content {
  width: 80%;
  height: 80%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
