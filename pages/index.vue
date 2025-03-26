<script setup lang="ts">
import ActiveTrips from '~/widgets/ActiveTrips/ActiveTrips.vue'
import UpcomingTrips from '~/widgets/UpcomingTrips/UpcomingTrips.vue'
import IcNotifications from '~/icons/IcNotifications.vue'
</script>

<template>
  <div class="relative flex flex-col gap-9">
    <NuxtLink class="absolute top-1 right-2" to="/notifications">
      <IcNotifications />
    </NuxtLink>
    <ActiveTrips />
    <UpcomingTrips />
  </div>
</template>

<style scoped></style>
