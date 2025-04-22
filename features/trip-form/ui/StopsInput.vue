<script setup lang="ts">
import { useTripFormStore } from '~/stores/tripForm'

const tripFormStore = useTripFormStore()

const emit = defineEmits<{ (e: 'open-selector', index: number): void }>()

const onInputClick = (index: number) => emit('open-selector', index)

const addStop = () => tripFormStore.addTripPoint({ name: 'Новая точка' })
</script>

<template>
  <div class="flex flex-col gap-7">
    <div
      v-for="(stop, index) in tripFormStore.tripPoints"
      :key="index"
      class="relative flex items-center py-0.5"
    >
      <span
        class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) text-xs font-bold"
        :class="{
          'bg-(--primary-orange) rounded-full': index === 0,
          'bg-(--primary-white) rounded-full border-2 border-(--dark-gray)':
            index === tripFormStore.tripPoints.length - 1,
          'bg-(--dark-gray) rounded-sm ':
            index !== 0 && index !== tripFormStore.tripPoints.length - 1,
        }"
      >
        <span v-if="index !== 0 && index !== tripFormStore.tripPoints.length - 1">
          {{ index }}</span
        >
      </span>
      <input
        type="text"
        :placeholder="stop?.name"
        class="ml-3 text-sm outline-none cursor-pointer"
        :class="{ 'text-(--primary-gray)': index === 1 && tripFormStore.tripPoints.length === 2 }"
        readonly
        @click="onInputClick(index)"
      />
      <div
        v-if="index !== tripFormStore.tripPoints.length - 1"
        class="absolute bottom-[-60%] h-[1.5px] bg-[#eeeeee] ml-[26px] w-[calc(100%-34px)]"
      ></div>
    </div>
    <div
      v-if="
        tripFormStore.tripPoints.length >= 2 &&
        tripFormStore.tripPoints[1].name !== 'Куда поедем?' &&
        tripFormStore.tripPoints[tripFormStore.tripPoints.length - 1].name !== 'Новая точка'
      "
      class="relative flex items-center py-0.5 cursor-pointer"
      @click="addStop"
    >
      <div class="absolute top-[-60%] h-[1.5px] bg-[#eeeeee] ml-[26px] w-[calc(100%-34px)]"></div>
      <span
        class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) font-light bg-(--primary-gray) rounded-full"
      >
        +
      </span>
      <p class="ml-3 text-sm font-semibold text-(--primary-gray)">Добавить точку</p>
    </div>
  </div>
</template>
