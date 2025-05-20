<script setup lang="ts">
import type { Component } from 'vue'
import IcArrow from '~/icons/IcArrow.vue'

defineProps<{
  iconComponent: Component
  title: string
  isFirst: boolean
  isLast: boolean
  isOnly: boolean
}>()
</script>

<template>
  <div
    :class="[
      'relative bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) py-[10px] pl-[10px] pr-[20px]',
      isOnly
        ? 'rounded-(--radius-2xl)'
        : isFirst
          ? 'rounded-t-(--radius-2xl)'
          : isLast
            ? 'rounded-b-(--radius-2xl)'
            : 'rounded-none',
    ]"
  >
    <div
      class="flex items-center gap-[10px]"
      :class="{
        'after:content-[\'\'] after:absolute after:h-px after:bg-(--arrow-gray) after:opacity-20 dark:after:opacity-80 after:bottom-0 after:left-[48px] after:right-0':
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
