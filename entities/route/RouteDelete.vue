<script setup lang="ts">
import IcWarn from '~/icons/IcWarn.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-60 bg-black/40 flex justify-center items-center">
    <div class="bg-white rounded-2xl p-[20px] shadow-xl w-[300px] max-w-md relative">
      <div class="">
        <IcWarn />
      </div>
      <div class="flex flex-col gap-[10px] mb-[29px]">
        <h4 class="text-(--color-text) font-medium text-[18px] text-center">Удалить поездку</h4>
        <p class="text-(--primary-gray) text-center">Вы уверены, что хотите удалить эту поездку?</p>
      </div>
      <div class="flex justify-between">
        <button
          @click="close"
          class="rounded-[12px] py-[10px] px-[30px] bg-(--smoke-gray) text-(--color-text) font-medium cursor-pointer"
        >
          Отмена
        </button>
        <button
          class="rounded-[12px] py-[10px] px-[30px] bg-(--primary-orange) text-(--primary-white) font-medium cursor-pointer"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
