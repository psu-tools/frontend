<script setup lang="ts">
interface Stop {
  name: string
}

const props = defineProps({
  stopsList: {
    type: Array as PropType<Stop[]>,
    required: true,
  },
})

const emit = defineEmits<{ (e: 'open-selector', index: number): void }>()

const onInputClick = (index: number) => emit('open-selector', index)

const addStop = () => props.stopsList.push({ name: 'Новая точка' })
</script>

<template>
  <div class="flex flex-col gap-7">
    <div v-for="(stop, index) in stopsList" :key="index" class="relative flex items-center py-0.5">
      <span
        class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) text-xs font-bold"
        :class="{
          'bg-(--primary-orange) rounded-full': index === 0,
          'bg-(--primary-white) dark:bg-(--primary-dark-bg) rounded-full border-2 border-(--dark-gray)':
            index === stopsList.length - 1,
          'bg-(--dark-gray) rounded-sm': index !== 0 && index !== stopsList.length - 1,
        }"
      >
        <span v-if="index !== 0 && index !== stopsList.length - 1"> {{ index }}</span>
      </span>
      <input
        type="text"
        :placeholder="stop?.name"
        class="ml-3 text-sm outline-none dark:text-(--primary-white)"
        :class="{ 'text-(--primary-gray)': index === 1 && stopsList.length === 2 }"
        readonly
        @click="onInputClick(index)"
      />
      <div
        v-if="index !== stopsList.length"
        class="absolute bottom-[-60%] h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[26px] w-[calc(100%-34px)]"
      ></div>
    </div>
    <div v-if="stopsList.length >= 2" class="relative flex items-center py-0.5" @click="addStop">
      <span
        class="flex items-center justify-center w-3.5 h-3.5 text-(--primary-white) font-light bg-(--primary-gray) rounded-full"
      >
        +
      </span>
      <p class="ml-3 text-sm font-semibold text-(--primary-gray)">Добавить точку</p>
    </div>
  </div>
</template>
