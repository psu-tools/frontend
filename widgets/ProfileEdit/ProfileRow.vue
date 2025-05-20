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
      class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) py-[18px] px-[15px] flex items-center justify-between"
    >
      <div class="flex items-center justify-between w-full text-sm">
        <div class="text-(--color-text) dark:text-(--primary-white)">{{ props.label }}</div>
        <div class="text-(--primary-gray-text)">{{ props?.value }}</div>
      </div>
      <div class="ml-[10px]">
        <IcArrow />
      </div>
    </div>
  </NuxtLink>
</template>
