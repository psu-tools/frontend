<script setup lang="ts">
import Calendar from '~/widgets/Calendar.vue'
import { useTripsStore } from '~/stores/trips'
import TripCard from '~/entities/trip/TripCard.vue'
import IcPlus from '~/icons/IcPlus.vue'
import AddTripModal from './addTripModal.vue'

const tripsStore = useTripsStore()
const isModalOpen = ref(false)

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
        <TripCard
          v-for="trip in tripsStore.filteredTrips"
          :key="trip.id"
          :status="'primary'"
          :trip="trip"
          :has-date="false"
        />
      </div>
      <div v-else class="text-center opacity-40 py-5">Нет поездок</div>

      <button
        class="bg-(--primary-yellow) p-4 rounded-[15px] drop-shadow-lg absolute bottom-28 right-5 overflow-hidden group transition cursor-pointer"
        @click="isModalOpen = true"
      >
        <IcPlus />
      </button>

      <AddTripModal v-if="isModalOpen" @close="isModalOpen = false" />
    </div>
  </div>
</template>

<style scoped></style>
