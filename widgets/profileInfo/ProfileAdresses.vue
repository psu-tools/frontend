<script setup lang="ts">
import IcArrow from '~/icons/IcArrow.vue'
import IcLocation from '~/icons/profile-widgets/IcLocation.vue'
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) py-[10px] pl-[10px] pr-[20px]"
  >
    <div class="flex items-center gap-[10px]">
      <div>
        <IcLocation />
      </div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white)">Мои адреса</div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
