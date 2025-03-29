<script setup lang="ts">
import Calendar from '~/widgets/Calendar.vue'
import { useTripsStore } from '~/stores/trips'
import PrimaryTripCard from '~/entities/trip/PrimaryTripCard.vue'

const tripsStore = useTripsStore()

onMounted(() => tripsStore.fetchTrips())
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-text">Предстоящие</h1>
    <Calendar class="mt-6" />

    <div v-if="tripsStore.selectedDate" class="mt-6 space-y-4">
      <h2 class="text-xs font-semibold">
        {{ tripsStore.formatDate(tripsStore.selectedDate.toISOString()) }}
      </h2>
      <div v-if="tripsStore.filteredTrips.length !== 0">
        <PrimaryTripCard
          v-for="trip in tripsStore.filteredTrips"
          :key="trip.id"
          :trip="trip"
          :has-date="false"
        />
      </div>
      <div v-else class="text-center opacity-40 py-5">Нет поездок</div>
    </div>
  </div>
</template>

<style scoped></style>
