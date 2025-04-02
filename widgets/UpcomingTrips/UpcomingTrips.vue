<script setup lang="ts">
import TripCard from '~/entities/trip/TripCard.vue'
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-text">На этой неделе</h2>
    <div class="mt-6 space-y-4">
      <TripCard
        v-for="trip in trips"
        :key="trip.id"
        :trip="trip"
        :status="'primary'"
        :has-date="true"
      />
      <div v-if="tripsStore.isLoading" class="text-center text-(--primary-light-gray)">
        Загрузка...
      </div>
      <div
        v-else-if="tripsStore.upcomingTrips.length === 0"
        class="text-center text-(--primary-light-gray)"
      >
        Поездок на этой неделе нет
      </div>
    </div>
  </div>
</template>

<style scoped></style>
