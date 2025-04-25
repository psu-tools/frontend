<script setup lang="ts">
import IcCar from '~/icons/transport-types/IcCar.vue'
import IcPublic from '~/icons/transport-types/IcPublic.vue'
import IcTaxi from '~/icons/transport-types/IcTaxi.vue'
import IcWalk from '~/icons/transport-types/IcWalk.vue'
import IcBicycle from '~/icons/transport-types/IcBicycle.vue'
import IcScooter from '~/icons/transport-types/IcScooter.vue'

import { useTripFormStore } from '~/stores/tripForm'

const tripFormStore = useTripFormStore()
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-4">
      <IcCar
        :selected="tripFormStore.transportType === 'CAR'"
        @click="tripFormStore.setTransportType('CAR')"
      />
      <IcPublic
        :selected="tripFormStore.transportType === 'PUBLIC_TRANSPORT'"
        @click="tripFormStore.setTransportType('PUBLIC_TRANSPORT')"
      />
      <IcTaxi
        :selected="tripFormStore.transportType === 'TAXI'"
        @click="tripFormStore.setTransportType('TAXI')"
      />
      <IcWalk
        :selected="tripFormStore.transportType === 'WALK'"
        @click="tripFormStore.setTransportType('WALK')"
      />
      <IcBicycle
        :selected="tripFormStore.transportType === 'BICYCLE'"
        @click="tripFormStore.setTransportType('BICYCLE')"
      />
      <IcScooter
        :selected="tripFormStore.transportType === 'SCOOTER'"
        @click="tripFormStore.setTransportType('SCOOTER')"
      />
    </div>
  </div>
</template>

<style scoped></style>
