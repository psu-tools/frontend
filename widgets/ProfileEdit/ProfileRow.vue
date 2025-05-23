<script setup lang="ts">
import IcArrow from '~/icons/IcArrow.vue'

const props = defineProps<{
  label: string
  value?: string
  link?: string
}>()
</script>

<template>
  <NuxtLink :to="props.link" class="w-full">
    <div
      class="cursor-pointer bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) py-[18px] px-[15px] flex items-center justify-between transition-colors"
    >
      <div class="flex items-center justify-between w-full text-sm">
        <div class="text-(--color-text) dark:text-(--primary-white)">{{ props.label }}</div>
        <div class="text-(--primary-gray-text) max-w-[200px] overflow-hidden">
          {{ props?.value }}
        </div>
      </div>
      <div class="ml-[10px]">
        <IcArrow />
      </div>
    </div>
  </NuxtLink>
</template>
