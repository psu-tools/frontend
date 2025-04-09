<script setup lang="ts">
interface Stop {
  name: String
  latitude: Number
  longitude: Number
  stopTime: Number
}

interface RoutesBlockProps {
  startingPoint: Stop
  arrivalPoint: Stop
}

defineProps<RoutesBlockProps>()
</script>
<template>
  <div class="w-full flex items-stretch gap-[15px]">
    <div class="bg-(--primary-orange) w-[20px] rounded-full z-10 mt-[10px] relative">
      <span
        class="absolute top-[4px] left-1/2 transform -translate-x-1/2 bg-(--primary-white) w-[12px] h-[12px] rounded-full z-20"
      ></span>
      <span
        class="absolute bottom-[4px] left-1/2 transform -translate-x-1/2 bg-(--primary-white) w-[12px] h-[12px] rounded-full z-20"
      ></span>
    </div>
    <div class="flex flex-col flex-auto gap-1.5">
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col">
          <p class="text-[14px] text-(--color-text) font-semibold w-[200px] break-all">
            {{ startingPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray)">Адрес</p>
        </div>
        <p class="text-[12px] text-(--color-text)">18:00</p>
      </div>
      <div class="text-[12px] text-(--color-text)">Тип транспорта</div>
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col">
          <p class="text-[14px] text-(--color-text) font-semibold w-[200px] break-all">
            {{ arrivalPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray)">Адрес</p>
        </div>
        <p class="text-[12px] text-(--color-text)">18:00</p>
      </div>
    </div>
  </div>
</template>
