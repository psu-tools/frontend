<script setup lang="ts"></script>

<template>
  <button
    class="bg-(--primary-orange) hover:bg-(--primary-orange-hover) transition-colors text-(--primary-white-bg) rounded-(--radius-2xl) w-full disabled:bg-(--primary-orange-disabled) cursor-pointer"
  >
    <slot />
  </button>
</template>

<style scoped></style>
