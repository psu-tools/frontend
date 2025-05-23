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

const getCumulativeTime = (upToIndex: number) => {
  let total = 0

  for (let i = 0; i < upToIndex; i++) {
    total += prop.routesTime[i] || 0
  }

  for (let i = 1; i <= upToIndex && i < prop.stopsList.length - 1; i++) {
    total += prop.stopsList[i].stopTime || 0
  }

  return total
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
        :departure-stop-time="formatTime(departureTime, getCumulativeTime(index))"
        :arrival-stop-time="
          index !== stopsList.length - 2
            ? formatTime(
                departureTime,
                getCumulativeTime(index + 1) - (stopsList[index + 1].stopTime || 0)
              )
            : arrivalTime.length === 5
              ? arrivalTime
              : formatTime(arrivalTime)
        "
      />
    </div>

    <div
      class="absolute top-[10px] left-0 w-[20px] bg-[#eeeeee] dark:bg-(--third-black-bg) rounded-full"
      style="height: calc(100% - 35px)"
    ></div>
  </div>
</template>
