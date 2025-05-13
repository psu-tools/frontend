<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import GeneralWidget from '~/widgets/profilePages/GeneralWidget.vue'

import IcClock from '~/icons/IcClock.vue'
</script>

<template>
  <div class="pb-24">
    <div class="mb-[50px]">
      <PagesTitle title="Запас времени" />
    </div>
    <div>
      <div class="w-full flex justify-center items-center mb-[15px]">
        <IcClock />
      </div>
      <h3
        class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold text-center mb-[10px]"
      >
        Запас времени
      </h3>
      <p class="text-xs text-center mb-[20px] text-(--primary-gray)">
        Дополнительный процент времени, чтобы учесть пробки, задержки и другие непредвиденные
        ситуации
      </p>
      <div class="flex items-center justify-center gap-[20px]"></div>
    </div>
  </div>
</template>
