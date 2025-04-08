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
  {
    name: 'Perm State Universitniversitnsdsdiversitdsy',
    latitude: 58.01045,
    longitude: 56.229446,
    stopTime: 15,
  },
  { name: 'Perm ', latitude: 58.01045, longitude: 56.229446, stopTime: 15 },
  { name: 'Perm State Art Gallery', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
  { name: 'Деревня', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
])
</script>
<template>
  <div class="relative flex flex-col gap-[25px]">
    <div v-for="(stop, index) in stopsList">
      <RouteBlock
        v-if="index !== stopsList.length - 1"
        :starting-point="stopsList[index]"
        :arrival-point="stopsList[index + 1]"
      />
    </div>
    <div
      class="absolute top-[10px] left-0 w-[20px] bg-[#eeeeee] rounded-full"
      style="height: calc(100% - 35px)"
    ></div>
  </div>
</template>
