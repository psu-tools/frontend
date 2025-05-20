<script setup lang="ts">
import TimeReservePicker from '~/shaared/ui/TimeReservePicker.vue'

const props = defineProps<{ initialPercentage?: number }>()

const emit = defineEmits<{ (e: 'close'): void; (e: 'select', value: number): void }>()

const selected = ref(props.initialPercentage ?? 5)

const handleSelect = (value: number) => {
  selected.value = value
}

const handleDone = () => {
  emit('select', selected.value)
  emit('close')
}
</script>

<template>
  <div
    class="absolute inset-0 z-50 bg-black/40 flex items-end px-5 pb-11"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-md mx-auto bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl px-[30px] py-5 shadow-xl"
    >
      <h2 class="text-left text-sm font-semibold pb-8 dark:text-(--primary-white)">
        Запас времени
      </h2>

      <TimeReservePicker :initial-percentage="selected" @select="handleSelect" />

      <button
        class="w-full mt-5 py-3 rounded-xl text-(--primary-white) text-sm font-semibold bg-(--primary-orange) cursor-pointer"
        @click="handleDone"
      >
        Готово
      </button>
    </div>
  </div>
</template>
