<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import StopsInput from '~/features/trip-form/ui/StopsInput.vue'
import { useTripFormStore } from '~/stores/tripForm'

const tripFormStore = useTripFormStore()

const prop = defineProps<{}>()

const emit = defineEmits<{
  (e: 'toggleExpand'): void
  (e: 'closeModal'): void
  (e: 'openPointSelector', index: number): void
  (e: 'onClickStopPoint', i: number): void
  (e: 'toggleDayMonthYearPopup'): void
  (e: 'toggleTimePopup'): void
  (e: 'toggleReminderPopup'): void
}>()

const handlerPointSelector = (index: number): void => {
  console.log(index)
  emit('openPointSelector', index)
}
</script>

<template>
  <form @submit.prevent class="w-full flex justify-center flex-col">
    <div class="sticky z-10 left-0 top-0 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)">
      <div
        @click="emit('toggleExpand')"
        class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) dark:opacity-30 cursor-pointer mb-[20px]"
      ></div>

      <div class="mb-4">
        <div class="flex justify-between items-center gap-2">
          <input
            type="text"
            placeholder="Название поездки"
            class="text-2xl font-bold text-(--color-text) dark:text-(--primary-white) outline-none caret-(--primary-orange) min-w-4"
            v-model="tripFormStore.tripName"
          />
          <button @click="emit('closeModal')" class="cursor-pointer">
            <IcClose />
          </button>
        </div>
      </div>
    </div>

    <div>
      <StopsInput @open-selector="handlerPointSelector" />
    </div>

    <div
      v-if="tripFormStore.tripPoints.length > 2"
      class="mt-[25px] space-y-[15px] text-(--color-text) dark:text-(--primary-white) text-sm"
    >
      <div
        v-for="(_, i) in tripFormStore.tripPoints.length - 2"
        class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
        @click="emit('onClickStopPoint', i)"
      >
        <p>Остановка в точке {{ i + 1 }}</p>
        <p class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl">
          {{ tripFormStore.tripPoints[i + 1].stopTime }} мин
        </p>
      </div>
    </div>

    <div class="mt-[25px] space-y-[15px]">
      <div
        class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
        @click="emit('toggleDayMonthYearPopup')"
      >
        <p>Дата</p>
        <p class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl">
          {{
            tripFormStore.tripDate?.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          }}
        </p>
      </div>

      <div
        class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
        @click="emit('toggleTimePopup')"
      >
        <p>Время прибытия</p>
        <p class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl">
          {{ tripFormStore?.arrivalTime }}
        </p>
      </div>

      <div
        class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
        @click="emit('toggleReminderPopup')"
      >
        <p>Напоминание</p>
        <p class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl">
          за {{ tripFormStore?.reminderTime }} минут
        </p>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
