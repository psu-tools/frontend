<script setup lang="ts">
import Phone from '~/assets/img/phone.png'

definePageMeta({
  layout: 'about',
})
</script>

<template>
  <div
    class="w-full min-h-screen pt-[145px] px-5 sm:px-10 md:px-16 lg:px-[180px] xl:px-[240px] 2xl:px-[256px] flex flex-col xl:flex-row justify-between items-start"
  >
    <div class="flex flex-col justify-between flex-1 h-full mb-10 lg:mb-0">
      <div>
        <div class="mb-[60px] text-5xl lg:text-6xl font-bold">Флоу</div>
        <div class="text-2xl lg:text-4xl leading-[140%]">
          Твой удобный помощник для эффективного планирования поездок
        </div>
      </div>
      <div class="mt-auto text-lg xl:pb-[145px]">PSU Tools</div>
    </div>

    <div class="flex justify-end items-end self-end">
      <img :src="Phone" alt="Phone" class="max-w-full h-auto object-contain" />
    </div>
  </div>
</template>
