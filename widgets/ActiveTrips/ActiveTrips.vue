<script setup lang="ts">
import ActiveTripCard from '~/entities/trip/ActiveTripCard.vue'
import { useTripsStore } from '~/stores/trips'

const tripsStore = useTripsStore()

defineProps<{ trips: Trip[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-[#353A40]">Активные</h2>
    <div class="mt-6">
      <a
        href="https://api.psu-tools.ru/v1/routes-service/trips/fe3308af-9b4b-4b68-8b84-027c4c8e7993"
        v-if="trips.length"
        class="space-y-4"
      >
        <ActiveTripCard v-for="trip in trips" :key="trips.id" :trip="trip" :active="true" />
      </a>
      <div v-if="tripsStore.isLoading" class="text-center text-gray-500">Загрузка...</div>
      <div v-else-if="tripsStore.activeTrips.length === 0" class="text-center text-gray-500">
        Активных поездок нет
      </div>
    </div>
  </div>
</template>

<style scoped></style>
