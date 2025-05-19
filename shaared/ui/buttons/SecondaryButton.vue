<script setup lang="ts"></script>

<template>
  <button
    class="bg-(--secondary-button-light) dark:bg-(--third-black-bg) text-(--color-text) dark:text-(--primary-white) hover:bg-(--primary-white-icon) dark:hover:bg-(--secondary-black-bg-hover) rounded-(--radius-2xl) py-[15px] px-10 transition-colors"
  >
    <slot />
  </button>
</template>

<style scoped></style>
