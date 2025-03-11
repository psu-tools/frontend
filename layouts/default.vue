<script setup lang="ts">
import Navbar from "~/widgets/navbar/Navbar.vue";

</script>

<template>
  <div class="relative bg-white  sm:w-96 h-screen sm:h-[700px] flex flex-col">
    <div class="flex-1 overflow-y-auto pt-6 px-4">
      <slot />
    </div>
    <Navbar />
  </div>
</template>

<style scoped>

</style>