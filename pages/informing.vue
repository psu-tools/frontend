<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import GeneralWidget from '~/widgets/profilePages/GeneralWidget.vue'
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Уведомления" />
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
