<script setup lang="ts">
import RouteBlock from '~/entities/route/RouteBlock.vue'

interface Routes {
  stopsList: Array<Stop>
}

interface Stop {
  name: String
  latitude: Number
  longitude: Number
  stopTime: Number
}
defineProps<Routes>()

const stopsList = ref([
  { name: 'Perm State University', latitude: 58.01045, longitude: 56.229446, stopTime: 15 },
  { name: 'Perm ', latitude: 58.01045, longitude: 56.229446, stopTime: 15 },
  { name: 'Perm State Art Gallery', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
  { name: 'Деревня', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
])
</script>
<template>
  <div v-for="(stop, index) in stopsList">
    <RouteBlock
      v-if="index !== stopsList.length - 1"
      :start="stopsList[index]"
      :end="stopsList[index + 1]"
    />
  </div>
</template>
