<template>
  <div
    class="sm:flex sm:justify-between sm:items-center sm:px-10 lg:px-24 2xl:justify-center 2xl:gap-20 sm:h-screen sm:bg-gradient-to-br sm:from-indigo-50 sm:to-indigo-400"
  >
    <div class="hidden sm:block w-1/2">
      <h1 class="sm:text-4xl lg:text-6xl sm:mb-32 2xl:pl-20">
        <span class="font-bold">Flow</span> — <br />
        Напоминания о поездках
      </h1>
    </div>
    <div class="sm:w-1/2 sm:pr-10">
      <NuxtLayout class="sm:rounded-3xl sm:shadow-2xl sm:mx-auto">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>