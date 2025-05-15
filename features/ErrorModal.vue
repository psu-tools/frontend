<script setup lang="ts">
import IcWarning from '~/icons/IcWarning.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'

defineProps<{
  isOpen: boolean
  message: string
  buttonText: string
}>()

const emit = defineEmits<{
  (e: 'onClick'): void
}>()
</script>

<template>
  <Transition class="absolute inset-0" name="fade" @click="emit('onClick')">
    <div v-if="isOpen" class="w-full h-full bg-black/20 flex justify-center items-center">
      <div
        @click.stop
        class="w-5/6 bg-(--primary-white) flex flex-col justify-between items-center p-5 rounded-(--radius-2xl)"
      >
        <IcWarning />
        <p class="mt-[15px] text-(--color-text) font-semibold text-sm">{{ message }}</p>
        <PrimaryOrangeButton class="mt-5 py-[10.5px]" @click="emit('onClick')">{{
          buttonText
        }}</PrimaryOrangeButton>
      </div>
    </div>
  </Transition>
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
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
