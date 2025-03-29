<script setup lang="ts">
import { ref, computed } from 'vue'

const isExpanded = ref(false)
const selectedDate = ref<Date | null>(null)
const currentDate = ref(new Date())
const today = new Date()

const headerDate = computed(() =>
  isExpanded.value ? currentDate.value : selectedDate.value || today
)

const toggleCalendar = () => {
  isExpanded.value = !isExpanded.value
}

const generateMonthDays = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1).getDay() || 7
  const lastDate = new Date(year, month + 1, 0).getDate()

  let days = Array(firstDay - 1).fill(null)
  days = days.concat([...Array(lastDate)].map((_, i) => new Date(year, month, i + 1)))
  return days
}

const getCurrentWeekDays = computed(() => {
  const baseDate = selectedDate.value || today
  const startOfWeek = new Date(baseDate)
  const dayOfWeek = startOfWeek.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  startOfWeek.setDate(startOfWeek.getDate() + diff)

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(date.getDate() + i)
    return date
  })
})

const formatMonthYear = (date: Date) =>
  date
    .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
    .replace(' г.', '')
    .replace(/^./, char => char.toUpperCase())

const selectDate = (date: Date) => {
  if (date) {
    selectedDate.value = date
  }
}

const changeMonth = (direction: number) => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + direction)
  currentDate.value = newDate
}

let touchStartX = 0
let mouseStartX = 0
let isMouseDown = false

const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.touches[0].clientX
  event.stopPropagation()
}

const handleTouchMove = (event: TouchEvent) => {
  event.preventDefault()
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!isExpanded.value) return
  const touchEndX = event.changedTouches[0].clientX
  const diffX = touchEndX - touchStartX
  if (Math.abs(diffX) > 50) {
    diffX < 0 ? changeMonth(1) : changeMonth(-1)
  }
}

const handleMouseDown = (event: MouseEvent) => {
  mouseStartX = event.clientX
  isMouseDown = true
  event.preventDefault()
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isMouseDown) return
  event.preventDefault()
}

const handleMouseUp = (event: MouseEvent) => {
  if (!isMouseDown) return
  if (!isExpanded.value) {
    isMouseDown = false
    return
  }
  const mouseEndX = event.clientX
  const diffX = mouseEndX - mouseStartX
  if (Math.abs(diffX) > 50) {
    diffX < 0 ? changeMonth(1) : changeMonth(-1)
  }
  isMouseDown = false
}
</script>

<template>
  <div
    class="overflow-hidden select-none"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchmove="handleTouchMove"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <div class="flex items-center gap-3 cursor-pointer" @click="toggleCalendar">
      <span
        class="font-semibold transition-colors text-xs"
        :class="{ 'text-text': !isExpanded, 'text-primary': isExpanded }"
      >
        {{ formatMonthYear(headerDate) }}
      </span>
      <span class="transition-transform" :class="{ 'rotate-90': isExpanded }">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="transition-colors"
            :class="{ 'fill-text': !isExpanded, 'fill-primary': isExpanded }"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.808 4.5509L1.136 0.179641C0.864 -0.0598802 0.448 -0.0598802 0.192 0.179641C-0.064 0.419162 -0.064 0.808383 0.192 1.06287L4.4 5L0.192 8.93713C-0.064 9.17665 -0.064 9.58084 0.192 9.82036C0.448 10.0599 0.864 10.0599 1.136 9.82036L5.808 5.43413C6.064 5.19461 6.064 4.80539 5.808 4.5509Z"
          />
        </svg>
      </span>
    </div>

    <div class="mt-2 py-2 grid grid-cols-7 gap-1 text-center">
      <span
        v-for="day in ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']"
        :key="day"
        class="font-semibold text-[#999999] text-[10px]"
      >
        {{ day }}
      </span>
    </div>

    <div
      class="grid grid-cols-7 gap-3 transition-all"
      :class="isExpanded ? 'grid-rows-6' : 'grid-rows-1'"
    >
      <span
        v-for="(date, index) in isExpanded ? generateMonthDays(currentDate) : getCurrentWeekDays"
        :key="date?.toISOString() || index"
        class="text-xs py-2.5 text-center rounded-xl cursor-pointer"
        :class="{
          'bg-primary text-white font-semibold':
            date && selectedDate && date.toDateString() === selectedDate.toDateString(),
          'text-primary font-semibold': date && date.toDateString() === today.toDateString(),
          'text-gray-400 font-normal':
            date &&
            date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) &&
            !(date.toDateString() === today.toDateString()),
          'font-bold': !date,
        }"
        @click="date && selectDate(date)"
      >
        {{ date ? date.getDate() : '' }}
      </span>
    </div>

    <div
      class="mx-auto my-1 h-1 w-8 rounded-full bg-gray-300 cursor-pointer"
      @click="toggleCalendar"
    ></div>
  </div>
</template>

<style scoped></style>
