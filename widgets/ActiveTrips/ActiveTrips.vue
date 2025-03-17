<script setup lang="ts">
import type { Trip } from '@/services/api'
import { fetchTrips } from '@/services/api'
import ActiveTripCard from '~/entities/trip/ActiveTripCard.vue'

const trips = ref<Trip[]>([])

onMounted(async () => {
  trips.value = await fetchTrips()
  console.log(trips.value.route)
})
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-[#353A40]">Активные</h2>
    <div class="mt-6">
      <div v-if="trips.length" class="space-y-4">
        <ActiveTripCard :key="trips[0].id" :trip="trips[0]" :active="true" />
      </div>
      <div v-else>
        <p>поездок нет</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
