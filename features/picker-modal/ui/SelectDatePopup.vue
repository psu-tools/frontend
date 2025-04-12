<script setup lang="ts">
import DayMonthYearPicker from '@/shaared/ui/DayMonthYearPicker.vue'
import { useTripFormStore } from '@/stores/tripForm'

const tripFormStore = useTripFormStore()

const emit = defineEmits<{ (e: 'close'): void }>()

const handleSelectedDate = (date: Date) => tripFormStore.setTripDate(date)
</script>

<template>
  <Teleport to="#modal-container">
    <div class="absolute inset-0 z-50 bg-black/40 flex items-end px-5 pb-11" @click.self="emit('close')">
      <div class="w-full max-w-md mx-auto bg-white rounded-2xl px-[30px] py-5 shadow-xl">
        <h2 class="text-left text-sm font-semibold pb-8">Дата поездки</h2>
        <DayMonthYearPicker
          :initial-date="tripFormStore.tripDate"
          @select="handleSelectedDate"
        />
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
