<script setup lang="ts">
import Navbar from '~/widgets/navbar/Navbar.vue'

const route = useRoute()
</script>

<template>
  <div
    id="modal-container"
    class="relative dark:bg-(--primary-black-bg) sm:w-96 h-dvh sm:h-[700px] flex flex-col overflow-hidden"
    :class="[route.meta.bodyClass || 'bg-(--primary-white)']"
  >
    <div class="mt-2.5 w-full flex items-center justify-center mb-[35px]">
      <slot />
    </div>
    <Navbar />
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  scrollbar-width: none;
}
</style>
