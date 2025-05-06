<script setup lang="ts">
import IcCheckMark from '~/icons/IcCheckMark.vue'
interface Props {
  title: string
  isActive: boolean
}

defineProps<Props>()
</script>
<template>
  <div>
    <div
      class="py-[18px] pl-[15px] pr-[18px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg) flex items-center justify-between"
    >
      <div class="text-(--color-text) dark:text-(--primary-white) text-sm font-normal">
        {{ title }}
      </div>
      <div v-if="isActive">
        <IcCheckMark />
      </div>
    </div>
  </div>
</template>
