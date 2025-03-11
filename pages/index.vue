<script setup lang="ts">

import UserInfo from "~/widgets/UserInfo/UserInfo.vue";
import ActiveTrips from "~/widgets/ActiveTrips/ActiveTrips.vue";
import UpcomingTrips from "~/widgets/UpcomingTrips/UpcomingTrips.vue";
</script>

<template>
  <div class="flex flex-col gap-9">
    <UserInfo />
    <ActiveTrips />
    <UpcomingTrips />
  </div>

</template>

<style scoped>

</style>