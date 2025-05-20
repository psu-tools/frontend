<script setup lang="ts">
import type { Component } from 'vue'
import ProfileRow from '~/widgets/profileInfo/ProfileRow.vue'

interface BlockItem {
  iconComponent: Component
  title: string
  path: string
}

defineProps<{
  items: BlockItem[]
}>()
</script>

<template>
  <div class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl)">
    <div class="flex flex-col items-start w-full">
      <NuxtLink v-for="(item, index) in items" :key="index" :to="item.path ?? ''" class="w-full">
        <ProfileRow
          :icon-component="item.iconComponent"
          :title="item.title"
          :is-last="index === items.length - 1"
          :is-first="index === 0"
          :is-only="items.length === 1"
        />
      </NuxtLink>
    </div>
  </div>
</template>
