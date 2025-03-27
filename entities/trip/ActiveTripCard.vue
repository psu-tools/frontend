<script setup lang="ts">
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

interface Props {
  trip: Trip
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative overflow-hidden h-24 rounded-[32px] py-4 px-5 flex justify-between items-center text-xs bg-primary text-white"
  >
    <div class="flex flex-col gap-2 justify-between items-start w-full">
      <div class="space-y-1">
        <p class="text-xs opacity-70">{{ tripsStore.formatDate(trip.arrivalDateTime) }}</p>
        <p class="text-sm font-semibold truncate w-36">{{ trip.name }}</p>
      </div>
      <div class="flex items-center gap-1 text-xs w-full">
        <p class="max-w-1/2 truncate whitespace-nowrap">{{ trip.route.at(0).name }}</p>
        <p>→</p>
        <p v-if="trip.route.length > 2" class="whitespace-nowrap">... →</p>
        <p class="max-w-1/2 truncate whitespace-nowrap">
          {{ trip.route.at(-1).name }}
        </p>
      </div>
    </div>
    <div>
      <div
        class="rounded-full border-2 flex flex-col items-center justify-center gap-0.5 h-14 w-14 border-[rgba(255,255,255,0.5)]"
      ></div>
    </div>
    <div class="absolute -right-3 border-2 rounded-full h-72 w-72 blur-xs opacity-20"></div>
    <div class="absolute -right-5 border-2 rounded-full h-52 w-52 blur-xs opacity-50"></div>
    <div class="absolute -right-2 border-2 rounded-full h-32 w-32 opacity-50"></div>
  </div>
</template>

<style scoped></style>
