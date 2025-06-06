<script setup lang="ts">
const props = defineProps<{ initialDate?: Date }>()

const emit = defineEmits<{ (e: 'select', value: Date): void }>()

const months = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'май',
  'июнь',
  'июль',
  'авг.',
  'сен.',
  'окт.',
  'ноя.',
  'дек.',
]

const days = ref<number[]>([])
const years = Array.from({ length: 30 }, (_, i) => 2025 + i)

const selectedDayIndex = ref(0)
const selectedMonthIndex = ref(0)
const selectedYearIndex = ref(0)

const paddedDays = computed(() => [...days.value])
const paddedMonths = computed(() => [...months])
const paddedYears = computed(() => [...years])

const itemHeight = 48
const visibleItems = 3
const paddingOffset = Math.floor(visibleItems / 2) * itemHeight

const selectedDate = computed(() => {
  const year = years[selectedYearIndex.value]
  const month = selectedMonthIndex.value
  const day = days.value[selectedDayIndex.value]
  return new Date(year, month, day)
})

const updateDays = () => {
  const year = years[selectedYearIndex.value]
  const month = selectedMonthIndex.value
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  days.value = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  if (selectedDayIndex.value >= daysInMonth) {
    selectedDayIndex.value = daysInMonth - 1
  }
}

const scrollToIndex = (el: HTMLElement | null, index: number) => {
  if (!el) return
  el.scrollTop = (index + 1) * itemHeight - paddingOffset
}

const getCurrentIndex = (scrollTop: number) =>
  Math.round((scrollTop + paddingOffset) / itemHeight) - 1

const onScroll = (e: Event, type: 'day' | 'month' | 'year') => {
  const el = e.target as HTMLElement
  const index = getCurrentIndex(el.scrollTop)

  if (
    index < 0 ||
    index >=
      {
        day: days.value.length,
        month: months.length,
        year: years.length,
      }[type]
  )
    return

  if (type === 'day') selectedDayIndex.value = index
  if (type === 'month') selectedMonthIndex.value = index
  if (type === 'year') selectedYearIndex.value = index
}

const dayCol = ref<HTMLElement | null>(null)
const monthCol = ref<HTMLElement | null>(null)
const yearCol = ref<HTMLElement | null>(null)

onMounted(() => {
  const date = props.initialDate ?? new Date()
  selectedYearIndex.value = years.findIndex(y => y === date.getFullYear())
  selectedMonthIndex.value = date.getMonth()
  updateDays()
  selectedDayIndex.value = date.getDate() - 1

  nextTick(() => {
    scrollToIndex(dayCol.value, selectedDayIndex.value)
    scrollToIndex(monthCol.value, selectedMonthIndex.value)
    scrollToIndex(yearCol.value, selectedYearIndex.value)
  })
})

watch([selectedMonthIndex, selectedYearIndex], updateDays)
watch([selectedDayIndex, selectedMonthIndex, selectedYearIndex], () =>
  emit('select', selectedDate.value)
)
</script>

<template>
  <div class="relative dark:text-(--primary-white)">
    <div class="relative z-10 flex gap-4 items-center justify-center">
      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="dayCol"
        @scroll.passive="e => onScroll(e, 'day')"
      >
        <div class="h-12"></div>
        <div
          v-for="(day, i) in paddedDays"
          :key="'day-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{ 'opacity-50': i !== selectedDayIndex }"
        >
          {{ day || '' }}
        </div>
        <div class="h-12"></div>
      </div>

      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="monthCol"
        @scroll.passive="e => onScroll(e, 'month')"
      >
        <div class="h-12"></div>

        <div
          v-for="(month, i) in paddedMonths"
          :key="'month-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{ 'opacity-50': i !== selectedMonthIndex }"
        >
          {{ month || '' }}
        </div>
        <div class="h-12"></div>
      </div>

      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="yearCol"
        @scroll.passive="e => onScroll(e, 'year')"
      >
        <div class="h-12"></div>
        <div
          v-for="(year, i) in paddedYears"
          :key="'year-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{ 'opacity-50': i !== selectedYearIndex }"
        >
          {{ year || '' }}
        </div>
        <div class="h-12"></div>
      </div>
    </div>
    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-4 items-center justify-center"
    >
      <div
        class="w-[75px] h-[45px] bg-(--secondary-white-bg) dark:bg-(--third-black-bg) rounded-xl"
      />
      <div
        class="w-[75px] h-[45px] bg-(--secondary-white-bg) dark:bg-(--third-black-bg) rounded-xl"
      />
      <div
        class="w-[75px] h-[45px] bg-(--secondary-white-bg) dark:bg-(--third-black-bg) rounded-xl"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
