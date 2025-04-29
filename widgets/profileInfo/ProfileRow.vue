<script setup lang="ts">
import type { Component } from 'vue'
import IcArrow from '~/icons/IcArrow.vue'

defineProps<{
  iconComponent: Component
  title: string
  isLast: boolean
}>()
</script>

<template>
  <div
    class="bg-[--primary-white-bg] dark:bg-[--secondary-black-bg] rounded-[--radius-2xl] py-[10px] pl-[10px] pr-[20px]"
  >
    <div class="flex items-center gap-[10px]">
      <div>
        <component :is="iconComponent" />
      </div>
      <div class="flex-1 relative">
        <div
          class="text-(--color-text) dark:text-(--primary-white)"
          :class="
            !isLast
              ? 'after:block after:absolute after:h-px after:bg-[#A3A5A8] after:mt-[10px] after:w-full z-10'
              : ''
          "
        >
          {{ title }}
        </div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
