<script setup lang="ts">
import IcArrow from '~/icons/IcArrow.vue'
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-4xl) py-[15px] pl-[15px] pr-[22px]"
  >
    <div class="flex items-center gap-[15px]">
      <div class="w-[60px] h-[60px] rounded-full bg-(--medium-gray)"></div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white) text-sm">name</div>
        <div class="text-[#A3A5A8] text-xs">email</div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
