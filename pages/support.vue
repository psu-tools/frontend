<script setup lang="ts">
import IcRedirect from '~/icons/IcRedirect.vue'
</script>

<template>
  <div class="relative min-h-[100%] flex flex-col justify-between pb-24">
    <div class="mt-[40px] flex flex-col gap-[35px] justify-between items-center">
      <div class="">
        <IcRedirect />
      </div>
      <h2 class="w-[220px] mx-auto text-lg text-center dark:text-(--primary-white) font-semibold">
        Вас перенаправит на другую страницу
      </h2>
    </div>
    <div class="flex flex-col gap-[15px]">
      <button
        class="cursor-pointer w-full font-semibold bg-(--primary-orange) rounded-2xl py-[15px] text-(--primary-white) text-sm"
      >
        Продолжить
      </button>
      <NuxtLink to="/profile" class="w-full">
        <button
          class="cursor-pointer w-full font-semibold bg-(--primary-gray-button) dark:bg-(--third-black-bg) rounded-2xl py-[15px] text-(--primary-white) text-sm"
        >
          Вернуться назад
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
