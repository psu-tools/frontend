<script setup lang="ts">
// interface DestinationProps {
//   stopsList: Array<Stop>
// }

// interface Stop {
//   name: String
//   latitude: Number
//   longitude: Number
//   stopTime: Number
// }

const stopsList = ref([
  { name: 'Perm State University', latitude: 58.01045, longitude: 56.229446, stopTime: 15 },
  { name: 'Perm State Art Gallery', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
  { name: 'Perm State Art Gallery', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
  { name: 'Perm State Art Gallery', latitude: 58.016667, longitude: 56.241667, stopTime: 25 },
])

// defineProps<DestinationProps>()
</script>
<template>
  <div class="flex flex-col gap-7">
    <div v-for="(stop, index) in stopsList" :key="index" class="relative flex items-center">
      <span
        class="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-(--primary-orange) text-white text-xs font-bold"
        :class="{
          'bg-(--primary-white) border-2 border-(--dark-gray)': index === stopsList.length - 1,
          'bg-(--dark-gray)': index !== 0 && index !== stopsList.length - 1,
        }"
      >
        <span class="" v-if="index !== 0 && index !== stopsList.length - 1">
          {{ index + 1 }}
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
