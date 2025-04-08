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
  <div class="flex flex-col gap-7">
    <div v-for="(stop, index) in stopsList" :key="index" class="relative flex items-center">
      <span
        class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) text-xs font-bold"
        :class="{
          'bg-(--primary-orange) rounded-full': index === 0,
          'bg-(--primary-white) rounded-full border-2 border-(--dark-gray)':
            index === stopsList.length - 1,
          'bg-(--dark-gray) rounded-sm ': index !== 0 && index !== stopsList.length - 1,
        }"
      >
        <span v-if="index !== 0 && index !== stopsList.length - 1">
          {{ index }}
        </span>
      </span>
      <p class="ml-3">{{ stop?.name }}</p>
      <div
        v-if="index !== stopsList.length - 1"
        class="absolute bottom-[-50%] h-[1.5px] bg-[#eeeeee] ml-[30px] w-[calc(100%-40px)]"
      ></div>
    </div>
  </div>
</template>
