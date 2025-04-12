<script setup lang="ts">
import DayMonthYearPicker from '@/shaared/ui/DayMonthYearPicker.vue'
import { useTripFormStore } from '@/stores/tripForm'
import TimePicker from '~/shaared/ui/TimePicker.vue'

const tripFormStore = useTripFormStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const localDate = ref<Date>(tripFormStore.tripDate ?? new Date())

const handleSelectedTime = (time: string) => {
  tripFormStore.setArrivalTime(time)
}
</script>

<template>
  <Teleport to="#modal-container">
    <div class="absolute inset-0 z-50 bg-black/40 flex items-end px-5 pb-11" @click.self="emit('close')">
      <div class="w-full max-w-md mx-auto bg-white rounded-2xl px-[30px] py-5 shadow-xl">
        <h2 class="text-left text-sm font-semibold pb-8">Время прибытия</h2>


        <TimePicker :initial-date="localDate" @select="handleSelectedTime" />

        <button
          class="w-full mt-5 py-3 rounded-xl text-white text-sm font-semibold bg-(--primary-orange)"
          @click="emit('close')"
        >
          Готово
        </button>
      </div>
    </div>
  </Teleport>
</template>
