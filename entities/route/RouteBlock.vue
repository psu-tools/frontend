<script setup lang="ts">
import TransportType from '~/features/trip-form/ui/TransportType.vue'

interface RoutesBlockProps {
  startingPoint: Point
  arrivalPoint: Point
  transportType: TransportType[]
  displayTime: string
  departureStopTime: string
  arrivalStopTime: string
}

defineProps<RoutesBlockProps>()
</script>
<template>
  <div class="w-full flex items-stretch gap-[15px]">
    <div class="left-0.25 bg-(--primary-orange) w-[20px] rounded-full z-10 mt-[10px] relative">
      <span
        class="absolute top-[4px] left-1/2 transform -translate-x-1/2 bg-(--primary-white) w-[12px] h-[12px] rounded-full z-20"
      ></span>
      <span
        class="absolute bottom-[4px] left-1/2 transform -translate-x-1/2 bg-(--primary-white) w-[12px] h-[12px] rounded-full z-20"
      ></span>
    </div>
    <div class="flex flex-col flex-auto gap-1.5 w-full">
      <div class="flex justify-between gap-2 items-center">
        <div class="flex flex-col w-full">
          <p
            class="text-[14px] text-(--color-text) dark:text-(--primary-white) font-semibold max-w-full"
          >
            {{ startingPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray) max-w-full">
            {{ startingPoint.address }}
          </p>
        </div>
        <p class="text-[12px] text-(--color-text) dark:text-(--primary-white)">
          {{ departureStopTime === 'NaN:NaN' ? '' : departureStopTime }}
        </p>
      </div>
      <div
        class="text-[12px] my-2.5 text-(--color-text) dark:text-(--primary-white) flex gap-[7px] items-center"
      >
        <TransportType v-for="transport in transportType" :type="transport" />
        <span>{{ displayTime }}</span>
      </div>
      <div class="flex justify-between gap-2 items-center">
        <div class="flex flex-col w-full">
          <p
            class="text-[14px] text-(--color-text) dark:text-(--primary-white) font-semibold max-w-full"
          >
            {{ arrivalPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray) max-w-full">
            {{ arrivalPoint.address }}
          </p>
        </div>
        <p class="text-[12px] text-(--color-text) dark:text-(--primary-white)">
          {{ arrivalStopTime === 'NaN:NaN' ? '' : arrivalStopTime }}
        </p>
      </div>
    </div>
  </div>
</template>
