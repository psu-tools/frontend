<script setup lang="ts">
import ActiveTripCard from '~/entities/trip/ActiveTripCard.vue'
import PrimaryTripCard from '~/entities/trip/PrimaryTripCard.vue'

interface TripProps {
  status: string
  trip: Trip
  hasDate: boolean
}

defineProps<TripProps>()
</script>
<template>
  <div v-if="status === 'active'">
    <ActiveTripCard :trip="trip" />
  </div>
  <div v-else-if="status === 'primary'">
    <PrimaryTripCard :trip="trip" :has-date="hasDate" />
  </div>
</template>
