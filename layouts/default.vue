<script setup lang="ts">
import Navbar from '~/widgets/navbar/Navbar.vue'

const route = useRoute()
</script>

<template>
  <div
    class="relative dark:bg-(--primary-black-bg) sm:w-96 h-dvh sm:h-[700px] flex flex-col overflow-hidden"
    :class="[route.meta.bodyClass || 'bg-(--primary-white)']"
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
