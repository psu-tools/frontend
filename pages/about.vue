<script setup lang="ts">
import Phone from '~/assets/img/phone.png'
definePageMeta({
  layout: 'about',
})
</script>
<template>
  <div class="w-full px-[256px] pt-[145px] min-h-screen flex items-stretch">
    <div class="flex justify-between items-start w-full">
      <div class="flex flex-col justify-between flex-1 pb-[145px]">
        <div>
          <div class="mb-[60px] text-6xl font-bold">Флоу</div>
          <div class="text-4xl leading-[140%]">
            Твой удобный помощник для <br />
            эффективного планирования <br />Phone поездок
          </div>
        </div>
        <div>PSU Tools</div>
      </div>
      <div class="flex flex-1 self-end justify-end">
        <img :src="Phone" alt="" />
      </div>
    </div>
  </div>
</template>
