<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'

import GeneralWidget from '~/widgets/profilePages/GeneralWidget.vue'
</script>

<template>
  <div class="pb-24">
    <NuxtLink to="/profile" class="w-full">
      <div class="py-[14px] mb-[10px] flex gap-[10px] items-center">
        <IcBack class="cursor-pointer" />
        <h2 class="text-lg dark:text-(--primary-white) font-semibold">Уведомления</h2>
      </div>
    </NuxtLink>
    <div class="flex flex-col gap-[15px]">
      <div class="">
        <GeneralWidget type="Telegram" id="@username" :has-checkbox="true" />
      </div>
      <div class="">
        <GeneralWidget type="Email" id="email@gmail.com" :has-checkbox="true" />
      </div>
      <div class="">
        <GeneralWidget type="Телефон" id="Функция находится в разработке" :has-checkbox="false" />
      </div>
    </div>
  </div>
</template>
