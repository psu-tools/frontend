<script setup lang="ts">
import Navbar from '~/widgets/navbar/Navbar.vue'
</script>

<template>
  <div class="relative bg-(--primary-white) sm:w-96 h-dvh sm:h-[700px] flex flex-col overflow-y-hidden">
    <div class="flex-1 overflow-y-auto pt-8 px-4 pb-24">
      <slot />
    </div>
    <Navbar />
    <div id="modal-container"></div>
  </div>
</template>
