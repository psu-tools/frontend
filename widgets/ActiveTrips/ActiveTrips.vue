<script setup lang="ts">
import TripCard from '~/entities/trip/TripCard.vue'
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-text">Активные</h2>
    <div class="mt-6 space-y-4">
      <TripCard
        v-for="trip in trips"
        :key="trips.id"
        :status="'active'"
        :trip="trip"
        :active="true"
      />
      <div v-if="tripsStore.isLoading" class="text-center text-(--primary-light-gray)">
        Загрузка...
      </div>
      <div
        v-else-if="tripsStore.activeTrips.length === 0"
        class="text-center text-(--primary-light-gray)"
      >
        Активных поездок нет
      </div>
    </div>
  </div>
</template>

<style scoped></style>
