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
    class="relative bg-[--primary-white-bg] dark:bg-[--secondary-black-bg] rounded-[--radius-2xl] py-[10px] pl-[10px] pr-[20px]"
  >
    <div
      class="flex items-center gap-[10px]"
      :class="{
        'after:content-[\'\'] after:absolute after:h-px after:bg-(--arrow-gray) after:opacity-80 after:bottom-0 after:left-[48px] after:right-0':
          !isLast,
      }"
    >
      <div>
        <component :is="iconComponent" />
      </div>
      <div class="flex-1 flex justify-between">
        <div class="text-(--color-text) dark:text-(--primary-white) text-sm">
          {{ title }}
        </div>
        <button class="cursor-pointer">
          <IcArrow />
        </button>
      </div>
    </div>
  </div>
</template>
