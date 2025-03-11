<script setup lang="ts">

import TripCard from "~/entities/trip/TripCard.vue";
</script>

<template>
<div>
  <h2 class="text-3xl font-bold text-[#353A40]">Ближайшие</h2>
  <div class="mt-4 space-y-4">
    <TripCard />
    <TripCard />
    <TripCard />
  </div>
</div>
</template>

<style scoped>

</style>