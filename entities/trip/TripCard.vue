<script setup lang="ts">
import ActiveTripCard from '~/entities/trip/ActiveTripCard.vue'
import PrimaryTripCard from '~/entities/trip/PrimaryTripCard.vue'

import { useModalStore } from '~/stores/modal'

interface TripProps {
  status: string
  trip: Trip
  hasDate: boolean
}

defineProps<TripProps>()

const modal = useModalStore()
</script>
<template>
  <div>
    <div v-if="status === 'active'" @click="modal.openModal(trip)">
      <ActiveTripCard :trip="trip" />
    </div>
    <div v-else-if="status === 'primary'" @click="modal.openModal(trip)">
      <PrimaryTripCard :trip="trip" :has-date="hasDate" />
    </div>
  </div>
</template>
