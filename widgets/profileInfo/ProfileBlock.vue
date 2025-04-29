<script setup lang="ts">
import type { Component } from 'vue'
import ProfileRow from '~/widgets/profileInfo/ProfileRow.vue'

interface BlockItem {
  iconComponent: Component
  title: string
}

defineProps<{
  items: BlockItem[]
}>()
</script>

<template>
  <div class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl)">
    <div class="flex flex-col items-start">
      <div class="w-full">
        <ProfileRow
          v-for="(item, index) in items"
          :key="index"
          :icon-component="item.iconComponent"
          :title="item.title"
        />
      </div>
    </div>
  </div>
</template>
