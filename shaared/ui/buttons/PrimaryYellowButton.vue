<template>
  <button
    class="bg-(--primary-yellow) hover:bg-(--primary-yellow-hover) transition-colors disabled:bg-(--primary-yellow-disabled-light) dark:disabled:bg-(--primary-yellow-disabled-dark) py-4 w-full rounded-2xl text-(--primary-white) disabled:opacity-60 cursor-pointer"
  >
    <slot />
  </button>
</template>
