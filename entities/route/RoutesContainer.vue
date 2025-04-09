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
