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
  <div class="">
    <div class=""></div>
    <div class="flex flex-col gap-1.5">
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col">
          <p class="text-[14px] text-(--color-text) font-semibold">
            {{ startingPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray)">Адрес</p>
        </div>
        <p class="text-[12px] text-(--color-text)">18:00</p>
      </div>
      <div class="text-[12px] text-(--color-text)">Тип транспорта</div>
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col">
          <p class="text-[14px] text-(--color-text) font-semibold">
            {{ arrivalPoint.name }}
          </p>
          <p class="text-[12px] text-(--primary-gray)">Адрес</p>
        </div>
        <p class="text-[12px] text-(--color-text)">18:00</p>
      </div>
    </div>
  </div>
</template>
