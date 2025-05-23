<script setup lang="ts">
import { useTripsStore } from '~/stores/trips'
import TransportType from '~/features/trip-form/ui/TransportType.vue'

const tripsStore = useTripsStore()

interface Props {
  trip: Trip
  hasDate: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-[32px] py-4 px-5 flex flex-col justify-between items-start text-xs bg-(--smoke-gray) hover:bg-(--primary-white-bg-hover) transition-colors dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-text dark:text-(--primary-white) cursor-pointer"
    :class="{ 'h-24': hasDate, 'h-20': !hasDate }"
  >
    <div
      class="flex justify-between items-start w-full"
      :class="{ 'items-start': hasDate, 'items-center': !hasDate }"
    >
      <div class="space-y-1 w-2/3">
        <p v-if="hasDate" class="text-xs opacity-60">
          {{ tripsStore.formatDate(trip.arrivalDateTime) }}
        </p>
        <p class="font-semibold text-sm truncate">{{ trip.name }}</p>
      </div>
      <div class="flex gap-1">
        <div class="rounded-full w-6 h-6 bg-(--primary-orange)/10 flex items-center justify-center">
          <TransportType v-for="type in trip.transportType" :type="type" />
        </div>
        <div
          class="rounded-full h-6 w-14 bg-(--primary-orange)/10 flex justify-center items-center gap-0.5"
        >
          <svg
            class="fill-(--primary-orange)"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.5 1.36364C4.11098 1.36364 1.36364 4.11098 1.36364 7.5C1.36364 10.889 4.11098 13.6364 7.5 13.6364C10.889 13.6364 13.6364 10.889 13.6364 7.5C13.6364 4.11098 10.889 1.36364 7.5 1.36364ZM0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.50018 2.72729C7.87674 2.72729 8.182 3.03256 8.182 3.40911V7.07864L10.5324 8.25382C10.8692 8.42222 11.0057 8.83177 10.8373 9.16858C10.6689 9.50538 10.2593 9.6419 9.92253 9.4735L7.19526 8.10986C6.96427 7.99436 6.81836 7.75828 6.81836 7.50002V3.40911C6.81836 3.03256 7.12362 2.72729 7.50018 2.72729Z"
            />
          </svg>
          <p class="text-[10px] font-semibold text-(--primary-orange)">
            {{ tripsStore.formatTime(trip.arrivalDateTime) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-1 text-xs w-full">
      <p class="max-w-1/2 truncate whitespace-nowrap">{{ trip?.route.at(0)?.name }}</p>
      <p>→</p>
      <p v-if="trip.route.length > 2" class="whitespace-nowrap">... →</p>
      <p class="max-w-1/2 truncate whitespace-nowrap">
        {{ trip?.route.at(-1)?.name }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
