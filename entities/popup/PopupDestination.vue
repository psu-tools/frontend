<script setup lang="ts">
interface DestinationProps {
  stopsList: Array<Stop>
}

interface Stop {
  name: String
  latitude: Number
  longitude: Number
  stopTime: Number
}

defineProps<DestinationProps>()
</script>

<template>
  <div class="relative flex flex-col gap-7">
    <div v-for="(stop, index) in stopsList" :key="index">
      <div
        class="relative pl-[30px] before:absolute before:w-3.5 before:h-3.5 before:bg-(--primary-orange) before: before:top-1/2 before:-translate-y-1/2 before:left-0 before:rounded-full"
        :class="{
          'before:bg-white before:border-2 before:border-[#4D4D4D]': index === stopsList.length - 1,
        }"
      >
        {{ stop?.name }}
      </div>
      <div
        v-if="index !== stopsList.length - 1"
        class="absolute top-1/2 h-[1.5px] bg-[#eeeeee] ml-[30px] w-[calc(100%-40px)]"
      ></div>
    </div>
  </div>
</template>
