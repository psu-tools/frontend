<script setup lang="ts">
import TripCard from '~/entities/trip/TripCard.vue'
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-text">На этой неделе</h2>
    <div class="mt-6">
      <a
        href="https://api.psu-tools.ru/v1/routes-service/trips/fe3308af-9b4b-4b68-8b84-027c4c8e7993"
        v-if="trips.length"
        class="space-y-4"
      >
        <TripCard
          v-for="trip in trips"
          :key="trip.id"
          :trip="trip"
          :status="'primary'"
          :has-date="true"
        />
      </a>
      <div v-if="tripsStore.isLoading" class="text-center text-gray-500">Загрузка...</div>
      <div v-else-if="tripsStore.upcomingTrips.length === 0" class="text-center text-gray-500">
        Поездок на этой неделе нет
      </div>
    </div>
  </div>
</template>

<style scoped></style>
