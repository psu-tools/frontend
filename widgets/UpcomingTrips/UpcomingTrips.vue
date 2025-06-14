<script setup lang="ts">
import TripCard from '~/entities/trip/TripCard.vue'
import { useTripsStore } from '~/stores/trips'
import NoTripsMessage from '~/shaared/ui/NoTripsMessage.vue'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-text dark:text-(--primary-white)">
      {{ $t('upcomingTripsTitle') }}
    </h2>
    <div v-if="tripsStore.upcomingTrips.length !== 0" class="mt-6 space-y-4">
      <TripCard
        v-for="trip in trips"
        :key="trip.id"
        :trip="trip"
        :status="'primary'"
        :has-date="true"
      />
    </div>
    <div v-else class="my-24">
      <NoTripsMessage />
    </div>
  </div>
</template>

<style scoped></style>
