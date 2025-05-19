<script setup lang="ts">
import { useTripFormStore } from '~/stores/tripForm'

const tripFormStore = useTripFormStore()

const emit = defineEmits<{ (e: 'open-selector', index: number): void }>()

const onInputClick = (index: number) => emit('open-selector', index)

const addStop = () => tripFormStore.addTripPoint({ name: 'Новая точка' })
</script>

<template>
  <div class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl overflow-hidden">
    <div class="flex flex-col dark:text-(--primary-white)">
      <div
        v-for="(stop, index) in tripFormStore.tripPoints"
        :key="index"
        @click="onInputClick(index)"
        class="relative flex items-center py-[16px] pl-[15px] pr-[5px] cursor-pointer hover:bg-(--primary-white-hover) transition-colors dark:hover:bg-(--secondary-black-bg-hover)"
      >
        <span
          class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) text-xs font-bold"
          :class="{
            'bg-(--primary-orange) rounded-full': index === 0,
            'rounded-full border-2 border-(--dark-gray) dark:border-(--primary-gray)':
              index === tripFormStore.tripPoints.length - 1,
            'bg-(--dark-gray) dark:bg-(--primary-gray) rounded-sm ':
              index !== 0 && index !== tripFormStore.tripPoints.length - 1,
          }"
        >
          <span
            class="text-[8px] text-(--primary-white) dark:text-(--secondary-black-bg)"
            v-if="index !== 0 && index !== tripFormStore.tripPoints.length - 1"
          >
            {{ index }}</span
          >
        </span>
        <input
          type="text"
          :placeholder="index === 0 ? 'Откуда поедем?' : 'Куда поедем?'"
          class="ml-3 text-sm cursor-pointer outline-none truncate w-5/6"
          readonly
          v-model="stop.name"
        />
        <div
          v-if="index !== tripFormStore.tripPoints.length - 1"
          class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[26px] w-[calc(100%-50px)]"
        ></div>
      </div>
      <div
        v-if="
          tripFormStore.tripPoints.length >= 2 &&
          tripFormStore.tripPoints[1].name !== '' &&
          tripFormStore.tripPoints[tripFormStore.tripPoints.length - 1].name !== 'Новая точка'
        "
        class="relative flex items-center cursor-pointer py-[16px] pl-[15px] pr-[5px] hover:bg-(--primary-white-hover) transition-colors dark:hover:bg-(--secondary-black-bg-hover)"
        @click="addStop"
      >
        <div
          class="absolute top-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[26px] w-[calc(100%-50px)]"
        ></div>
        <span
          class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) font-light bg-(--primary-gray) rounded-full"
        >
          +
        </span>
        <p class="ml-3 text-sm font-semibold text-(--primary-gray)">Добавить точку</p>
      </div>
    </div>
  </div>
</template>
