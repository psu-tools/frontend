<script setup lang="ts">
import IcCheckMark from '~/icons/IcCheckMark.vue'

interface Props {
  title: string
  isActive: boolean
}

const emit = defineEmits(['click'])
defineProps<Props>()
</script>

<template>
  <div>
    <div
      @click="emit('click')"
      class="cursor-pointer py-[18px] pl-[15px] pr-[18px] rounded-2xl flex items-center justify-between transition-all duration-300 ease-in-out bg-(--primary-white) dark:bg-(--secondary-black-bg) hover:bg-gray-100 dark:hover:bg-gray-800"
      :class="{ 'shadow-md': isActive }"
    >
      <div
        class="text-sm text-(--color-text) dark:text-(--primary-white) font-normal transition-colors duration-300 'text-(--color-text) dark:text-(--primary-white)'"
      >
        {{ title }}
      </div>

      <!-- Плавное появление галочки -->
      <transition name="fade">
        <div v-if="isActive">
          <IcCheckMark class="transition-opacity duration-300 opacity-100" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
