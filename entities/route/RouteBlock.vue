<script setup lang="ts">
interface Stop {
  name: String
  latitude: Number
  longitude: Number
  stopTime: Number
}

interface RoutesBlockProps {
  start: Stop
  end: Stop
}

defineProps<RoutesBlockProps>()
</script>
<template>
  <div class="">
    <div class=""></div>
    <div class="">
      <div class="">{{ start.name }}</div>
      <div class=""></div>
      <div class="">{{ end.name }}</div>
    </div>
  </div>
</template>
