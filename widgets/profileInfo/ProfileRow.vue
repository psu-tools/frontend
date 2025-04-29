<script setup lang="ts">
import type { Component } from 'vue'
import IcArrow from '~/icons/IcArrow.vue'

interface ProfileRowProps {
  iconComponent: Component
  title: string
}

const props = defineProps<ProfileRowProps>()
</script>

<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) py-[10px] pl-[10px] pr-[20px]"
  >
    <div class="flex items-center gap-[10px]">
      <div>
        <component :is="props.iconComponent" />
      </div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white)">{{ props.title }}</div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
