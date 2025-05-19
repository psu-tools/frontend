<script setup lang="ts">
import TripPopup from '~/pages/tripPopup.vue'
</script>

<template>
  <VitePwaManifest />
  <div
    class="sm:flex sm:justify-between sm:items-center sm:px-10 lg:px-24 2xl:justify-center 2xl:gap-20 sm:h-screen sm:bg-gradient-to-br sm:from-[#f4f4f8] sm:to-(--primary-orange) dark:sm:from-black dark:to-(--primary-orange)"
  >
    <div class="hidden sm:block w-1/2">
      <div class="flex gap-3 items-start sm:pb-32">
        <img src="/favicon.svg" class="mt-1.5" width="80" height="80" alt="flow logo" />
        <h1 class="text-text dark:text-(--primary-orange) sm:text-4xl lg:text-6xl 2xl:pl-20">
          <span class="font-bold">Flow</span> — <br />
          Напоминания о поездках
        </h1>
      </div>
    </div>
    <div class="sm:w-1/2 sm:pr-10">
      <NuxtLayout class="sm:rounded-3xl sm:shadow-2xl sm:mx-auto overflow-hidden">
        <NuxtPage />
        <TripPopup />
      </NuxtLayout>
    </div>
  </div>
</template>
