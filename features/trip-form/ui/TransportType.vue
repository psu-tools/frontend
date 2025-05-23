<script setup lang="ts">
import IcWalkRounded from '~/icons/transport-types/another_variant/IcWalkRounded.vue'
import IcTaxiRounded from '~/icons/transport-types/another_variant/IcTaxiRounded.vue'
import IcScooterRounded from '~/icons/transport-types/another_variant/IcScooterRounded.vue'
import IcPublicRounded from '~/icons/transport-types/another_variant/IcPublicRounded.vue'
import IcCarRounded from '~/icons/transport-types/another_variant/IcCarRounded.vue'
import IcBicycleRounded from '~/icons/transport-types/another_variant/IcBicycleRounded.vue'
import IcWalk25x25 from '~/icons/transport-types/25x25/IcWalk25x25.vue'
import IcTaxi25x25 from '~/icons/transport-types/25x25/IcTaxi25x25.vue'
import IcScooter25x25 from '~/icons/transport-types/25x25/IcScooter25x25.vue'
import IcPublic25x25 from '~/icons/transport-types/25x25/IcPublic25x25.vue'
import IcCar25x25 from '~/icons/transport-types/25x25/IcCar25x25.vue'
import IcBicycle25x25 from '~/icons/transport-types/25x25/IcBicycle25x25.vue'
defineProps<{ type: TransportType; size?: number }>()
</script>

<template>
  <div v-if="!size || size === 20">
    <IcWalkRounded v-if="type === 'WALK'" />
    <IcTaxiRounded v-if="type === 'TAXI'" />
    <IcScooterRounded v-if="type === 'SCOOTER'" />
    <IcPublicRounded v-if="type === 'PUBLIC_TRANSPORT'" />
    <IcCarRounded v-if="type === 'CAR'" />
    <IcBicycleRounded v-if="type === 'BICYCLE'" />
  </div>
  <div v-if="size === 25">
    <IcWalk25x25 v-if="type === 'WALK'" />
    <IcTaxi25x25 v-if="type === 'TAXI'" />
    <IcScooter25x25 v-if="type === 'SCOOTER'" />
    <IcPublic25x25 v-if="type === 'PUBLIC_TRANSPORT'" />
    <IcCar25x25 v-if="type === 'CAR'" />
    <IcBicycle25x25 v-if="type === 'BICYCLE'" />
  </div>
</template>
