<script setup lang="ts">
import ActiveTrips from '~/widgets/ActiveTrips/ActiveTrips.vue'
import UpcomingTrips from '~/widgets/UpcomingTrips/UpcomingTrips.vue'
import IcNotifications from '~/icons/IcNotifications.vue'
import { useTripsStore } from '@/stores/trips'

const tripsStore = useTripsStore()

onMounted(async () => {
  await tripsStore.fetchTrips()
  console.log(tripsStore.activeTrips)
})
</script>

<template>
  <div class="relative flex flex-col gap-9">
    <NuxtLink class="absolute top-1 right-2" to="/notifications">
      <IcNotifications />
    </NuxtLink>
    <ActiveTrips :trips="tripsStore.activeTrips" />
    <UpcomingTrips :trips="tripsStore.upcomingTrips" />
  </div>
</template>

<style scoped></style>
