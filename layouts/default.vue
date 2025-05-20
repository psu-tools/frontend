<script setup lang="ts">
import Navbar from '~/widgets/navbar/Navbar.vue'
</script>

<template>
  <div
    class="relative bg-(--primary-white) dark:bg-(--primary-black-bg) sm:w-96 h-dvh sm:h-[700px] flex flex-col overflow-hidden"
  >
    <div class="flex-1 overflow-y-auto pt-8 px-4 scrollbar-hide">
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
