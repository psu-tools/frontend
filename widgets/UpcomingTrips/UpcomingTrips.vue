<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Trip } from '@/services/api';
import { fetchTrips } from '@/services/api';
import TripCard from "~/entities/trip/TripCard.vue";

const trips = ref<Trip[]>([]);

onMounted(async () => {
  trips.value = await fetchTrips();
});
</script>

<template>
<div>
  <h2 class="text-3xl font-bold text-[#353A40]">Ближайшие</h2>
  <div class="mt-6">
    <div v-if="trips.length" class="space-y-4">
      <TripCard
          v-for="trip in trips"
          :key="trip.id"
          :trip="trip"
          :active="false"
      />
    </div>
    <div v-else>
      <p>поездок нет</p>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>