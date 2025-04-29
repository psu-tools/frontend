<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  isOpen: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  icon?: Component
  onConfirm: () => void
  onCancel: () => void
}>()
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="absolute top-0 left-0 right-0 bottom-0 z-60 bg-black/50 flex items-center justify-center"
      @click.stop
    >
      <div
        class="bg-(--primary-white) dark:bg-(--secondary-black-bg) p-[20px] rounded-2xl w-[300px]"
      >
        <div v-if="icon" class="w-full flex justify-center items-center mb-[15px]">
          <component :is="icon" />
        </div>
        <h3
          class="text-lg text-(--color-text) dark:text-(--primary-white) font-semibold text-center mb-[10px]"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-center mb-[20px] text-(--primary-gray)">
          {{ description }}
        </p>
        <div class="flex items-center justify-center gap-[20px]">
          <button
            @click="onCancel"
            class="px-[30px] py-[11px] cursor-pointer rounded-[12px] bg-[#F6F6F6] dark:bg-(--third-black-bg) text-(--color-text) dark:text-white"
          >
            {{ cancelText }}
          </button>
          <button
            @click="onConfirm"
            class="px-[30px] py-[11px] cursor-pointer rounded-[12px] bg-(--primary-red) text-white"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
