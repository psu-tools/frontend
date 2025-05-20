<script setup lang="ts">
import RouteBlock from '~/entities/route/RouteBlock.vue'

interface Routes {
  stopsList: Point[]
  transportType: TransportType[]
  departureTime: string
  routesTime: number[]
  displayRoutesTime: string[]
  arrivalTime: string
}

const prop = defineProps<Routes>()

const formatTime = (time: string, minutesToAdd = 0) => {
  const date = new Date(time)
  date.setMinutes(date.getMinutes() + minutesToAdd)

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const getCumulativeMinutes = (upToIndex: number) => {
  return prop.routesTime.slice(0, upToIndex).reduce((acc, val) => acc + val, 0)
}
</script>

<template>
  <div class="relative flex flex-col gap-[25px]">
    <div v-for="(_, index) in stopsList">
      <RouteBlock
        v-if="index !== stopsList.length - 1"
        :starting-point="stopsList[index]"
        :arrival-point="stopsList[index + 1]"
        :transport-type="transportType"
        :display-time="displayRoutesTime[index]"
        :departure-stop-time="formatTime(departureTime, getCumulativeMinutes(index))"
        :arrival-stop-time="formatTime(departureTime, getCumulativeMinutes(index + 1))"
      />
    </div>

    <div
      class="absolute top-[10px] left-0 w-[20px] bg-[#eeeeee] dark:bg-(--third-black-bg) rounded-full"
      style="height: calc(100% - 35px)"
    ></div>
  </div>
</template>
