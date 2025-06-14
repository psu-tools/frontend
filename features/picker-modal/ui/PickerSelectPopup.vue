<script setup lang="ts">
import TimePicker from '~/shaared/ui/TimePicker.vue'
import { useTripFormStore } from '@/stores/tripForm'
import DayMonthYearPicker from '~/shaared/ui/DayMonthYearPicker.vue'
import ReminderTimePicker from '~/shaared/ui/ReminderTimePicker.vue'
import StopTimePicker from '~/shaared/ui/StopTimePicker.vue'

const tripFormStore = useTripFormStore()

const props = defineProps<{
  type: 'date' | 'time' | 'reminder' | 'stopTime'
  stopTimeIndex?: number
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const handleSelectedTime = (time: string) => tripFormStore.setArrivalTime(time)

const handleSelectedDate = (date: Date) => tripFormStore.setTripDate(date)

const handleSelectedReminder = (time: number) => tripFormStore.setReminderTime(time)

const handleSelectedStopTime = (time: number) => {
  if (props.stopTimeIndex && tripFormStore.tripPoints[props.stopTimeIndex].stopTime !== time) {
    tripFormStore.setPointStopTime(props.stopTimeIndex, time)
  }
}
</script>

<template>
  <div>
    <div
      class="absolute inset-0 z-50 bg-black/40 flex items-end px-5 pb-11"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-md mx-auto bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-2xl px-[30px] py-5"
      >
        <h2 class="text-left text-sm font-semibold pb-8 dark:text-(--primary-white)">
          {{
            props.type === 'time'
              ? $t('arrivalTime')
              : props.type === 'date'
                ? $t('date')
                : props.type === 'reminder'
                  ? $t('reminder')
                  : props.type === 'stopTime'
                    ? $t('stopAtPoint')
                    : ''
          }}
        </h2>

        <TimePicker
          v-if="props.type === 'time'"
          :initial-time="tripFormStore.arrivalTime"
          @select="handleSelectedTime"
        />

        <DayMonthYearPicker
          v-if="props.type === 'date'"
          :initial-date="tripFormStore.tripDate"
          @select="handleSelectedDate"
        />

        <ReminderTimePicker
          v-if="props.type === 'reminder'"
          :initial-reminder-time="tripFormStore.reminderTime"
          @select="handleSelectedReminder"
        />

        <StopTimePicker
          v-if="props.type === 'stopTime' && stopTimeIndex"
          :initial-reminder-time="tripFormStore.tripPoints[stopTimeIndex].stopTime"
          @select="handleSelectedStopTime"
        />

        <button
          class="w-full mt-5 py-3 rounded-xl text-(--primary-white) text-sm font-semibold bg-(--primary-orange) cursor-pointer"
          @click="emit('close')"
        >
          {{ $t('pickerModalButton') }}
        </button>
      </div>
    </div>
  </div>
</template>
