<script setup lang="ts">

import TripCard from "~/entities/trip/TripCard.vue";
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-[#353A40]">Активные</h2>
    <TripCard class="mt-6" :active="true" />
  </div>
</template>

<style scoped>

</style>