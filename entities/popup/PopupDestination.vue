<script setup lang="ts">
interface DestinationProps {
  stopsList: Array<Stop>
}

interface Stop {
  name: String
  latitude: Number
  longitude: Number
  stopTime: Number
}

defineProps<DestinationProps>()
</script>
<template>
  <div class="flex flex-col gap-6">
    <div
      class="relative pl-[30px] before:absolute before:w-3 before:h-3 before:bg-(--primary-orange) before: before:top-1/2 before:-translate-y-1/2 before:left-0 before:rounded-full"
      :class="{
        'before:bg-white before:border-2 before:border-(#4D4D4D)':
          stop === stopsList[stopsList.length - 1],
      }"
      v-for="stop in stopsList"
    >
      {{ stop?.name }}
    </div>
  </div>
</template>
