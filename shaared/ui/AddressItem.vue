<script setup lang="ts">
import IcAddressPoint from '~/icons/IcAddressPoint.vue'
import IcAddressRecently from '~/icons/IcAddressRecently.vue'

defineProps<{
  icon: 'point' | 'clock'
  name: string | null
  address: string | null
}>()
</script>

<template>
  <div class="flex gap-2 items-center justify-start">
    <div class="w-1/12">
      <IcAddressPoint v-if="icon === 'point'" />
      <IcAddressRecently v-if="icon === 'clock'" />
    </div>
    <div class="flex flex-col items-start gap-1 w-11/12 overflow-y-hidden">
      <p
        class="text-sm text-(--color-text) dark:text-(--primary-white) max-w-full truncate whitespace-nowrap"
      >
        {{ name }}
      </p>
      <p class="text-xs max-w-full text-(--primary-gray) truncate whitespace-nowrap">
        {{ address }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
