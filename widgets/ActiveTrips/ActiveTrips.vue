<script setup lang="ts">
import TripCard from '~/entities/trip/TripCard.vue'
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div v-if="tripsStore.activeTrips.length !== 0">
    <h2 class="text-3xl font-bold text-text dark:text-(--primary-white)">Активные</h2>
    <div class="mt-6 space-y-4">
      <TripCard
        v-for="trip in trips"
        :key="trip.id"
        :status="'active'"
        :trip="trip"
        :has-date="true"
      />
    </div>
  </div>
</template>

<style scoped></style>
