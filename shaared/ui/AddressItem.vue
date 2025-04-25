<script setup lang="ts">
import IcAddressPoint from '~/icons/IcAddressPoint.vue'
import IcAddressRecently from '~/icons/IcAddressRecently.vue'

defineProps<{
  icon: 'point' | 'clock'
  name: string
  address: string
}>()
</script>

<template>
  <IcAddressPoint v-if="icon === 'point'" />
  <IcAddressRecently v-if="icon === 'clock'" />
  <div class="flex flex-col items-start gap-1">
    <p class="text-sm text-(--color-text) dark:text-(--primary-white)">{{ name }}</p>
    <p class="text-xs text-(--primary-gray)">{{ address }}</p>
  </div>
</template>

<style scoped></style>
