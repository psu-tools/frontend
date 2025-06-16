<script setup lang="ts">
import Calendar from '~/widgets/Calendar.vue'
import { useTripsStore } from '~/stores/trips'
import { useAddTripModalStore } from '~/stores/addTripModal'
import TripCard from '~/entities/trip/TripCard.vue'
import IcPlus from '~/icons/IcPlus.vue'

const tripsStore = useTripsStore()
const addTripModalStore = useAddTripModalStore()

const openModal = () => addTripModalStore.openModal()

const isCalendarExpanded = ref<boolean>(false)

const calendarExpandToggle = (value: boolean) => (isCalendarExpanded.value = value)
</script>

<template>
  <div class="h-full">
    <header
      class="absolute z-10 top-0 left-0 right-0 pt-4 px-4 bg-(--primary-white) dark:bg-(--primary-black-bg)"
    >
      <h1 class="text-3xl font-bold text-text dark:text-(--primary-white)">
        {{ $t('tripsPageTitle') }}
      </h1>
      <Calendar class="mt-6 -mx-4" @toggle-expand="calendarExpandToggle" />
    </header>

    <div
      v-if="tripsStore.selectedDate"
      class="space-y-4 transition-all"
      :class="{ 'mt-48': !isCalendarExpanded, 'mt-[430px]': isCalendarExpanded }"
    >
      <h2 class="text-xs font-semibold dark:text-(--primary-white)">
        {{ tripsStore.formatDate(tripsStore.selectedDate.toISOString()) }}
      </h2>

      <div v-if="tripsStore.filteredTrips.length !== 0" class="space-y-4">
        <TripCard
          v-for="trip in tripsStore.filteredTrips"
          :key="trip.id"
          :status="'primary'"
          :trip="trip"
          :has-date="false"
        />
      </div>
      <div v-else class="text-center opacity-40 py-5 dark:text-(--primary-white)">
        {{ $t('noTripsMessageTitle') }}
      </div>
    </div>
    <button
      class="bg-(--primary-yellow) p-4 rounded-[15px] shadow-lg absolute bottom-28 right-5 overflow-hidden group transition cursor-pointer"
      @click="openModal"
    >
      <IcPlus />
    </button>
  </div>
</template>
