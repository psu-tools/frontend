<script setup lang="ts">
import ActiveTrips from '~/widgets/ActiveTrips/ActiveTrips.vue'
import UpcomingTrips from '~/widgets/UpcomingTrips/UpcomingTrips.vue'
</script>

<template>
  <div class="flex flex-col gap-9">
    <ActiveTrips />
    <UpcomingTrips />
  </div>
</template>

<style scoped></style>
