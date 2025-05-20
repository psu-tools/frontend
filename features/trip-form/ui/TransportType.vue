<script setup lang="ts">
import IcWalkRounded from '~/icons/transport-types/another_variant/IcWalkRounded.vue'
import IcTaxiRounded from '~/icons/transport-types/another_variant/IcTaxiRounded.vue'
import IcScooterRounded from '~/icons/transport-types/another_variant/IcScooterRounded.vue'
import IcPublicRounded from '~/icons/transport-types/another_variant/IcPublicRounded.vue'
import IcCarRounded from '~/icons/transport-types/another_variant/IcCarRounded.vue'
import IcBicycleRounded from '~/icons/transport-types/another_variant/IcBicycleRounded.vue'
defineProps<{ type: TransportType }>()
</script>

<template>
  <IcWalkRounded v-if="type === 'WALK'" />
  <IcTaxiRounded v-if="type === 'TAXI'" />
  <IcScooterRounded v-if="type === 'SCOOTER'" />
  <IcPublicRounded v-if="type === 'PUBLIC_TRANSPORT'" />
  <IcCarRounded v-if="type === 'CAR'" />
  <IcBicycleRounded v-if="type === 'BICYCLE'" />
</template>
