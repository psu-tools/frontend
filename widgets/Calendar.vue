<script setup lang="ts">
import { useTripsStore } from '@/stores/trips'

const { locale } = useI18n()

const tripsStore = useTripsStore()

const isExpanded = ref(false)
const selectedDate = ref(tripsStore.selectedDate || new Date())
const currentDate = ref(new Date())
const today = new Date()

const weekDays = ref(
  locale.value === 'ru'
    ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
)

const headerDate = computed(() =>
  isExpanded.value ? currentDate.value : selectedDate.value || today
)

const toggleCalendar = () => (isExpanded.value = !isExpanded.value)

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
    .toLocaleDateString(locale.value.toUpperCase(), { month: 'long', year: 'numeric' })
    .replace(' г.', '')
    .replace(/^./, char => char.toUpperCase())

const selectDate = (date: Date) => {
  if (date) {
    selectedDate.value = date
    tripsStore.setSelectedDate(date)
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

let startY = 0
let dragging = false

const onGlobalMouseMove = (e: MouseEvent) => {
  if (!dragging) return
  const dy = e.clientY - startY
  const THRESHOLD = 30
  if (Math.abs(dy) > THRESHOLD) {
    isExpanded.value = dy > 0
    dragging = false
    removeGlobalListeners()
  }
}

const onGlobalMouseUp = () => {
  dragging = false
  removeGlobalListeners()
}

const addGlobalListeners = () => {
  window.addEventListener('mousemove', onGlobalMouseMove)
  window.addEventListener('mouseup', onGlobalMouseUp)
}

const removeGlobalListeners = () => {
  window.removeEventListener('mousemove', onGlobalMouseMove)
  window.removeEventListener('mouseup', onGlobalMouseUp)
}

const handleVerticalStart = (e: MouseEvent | TouchEvent) => {
  startY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY
  dragging = true
  addGlobalListeners()
}

const onGlobalTouchMove = (e: TouchEvent) => {
  if (!dragging) return
  const dy = e.touches[0].clientY - startY
  const THRESHOLD = 30
  if (Math.abs(dy) > THRESHOLD) {
    isExpanded.value = dy > 0
    dragging = false
    removeGlobalTouchListeners()
  }
}

const onGlobalTouchEnd = () => {
  dragging = false
  removeGlobalTouchListeners()
}

const addGlobalTouchListeners = () => {
  window.addEventListener('touchmove', onGlobalTouchMove)
  window.addEventListener('touchend', onGlobalTouchEnd)
}

const removeGlobalTouchListeners = () => {
  window.removeEventListener('touchmove', onGlobalTouchMove)
  window.removeEventListener('touchend', onGlobalTouchEnd)
}

const handleTouchVerticalStart = (e: TouchEvent) => {
  startY = e.touches[0].clientY
  dragging = true
  addGlobalTouchListeners()
}

const calendarBodyRef = ref<HTMLElement | null>(null)
const expandedHeight = ref(0)
const collapsedHeight = ref(0)

const updateHeights = async () => {
  await nextTick()

  const el = calendarBodyRef.value
  if (!el) return

  const clone = el.cloneNode(true) as HTMLElement
  clone.style.position = 'absolute'
  clone.style.visibility = 'hidden'
  clone.style.pointerEvents = 'none'
  clone.style.maxHeight = 'none'
  clone.style.height = 'auto'

  document.body.appendChild(clone)

  const fullDays = generateMonthDays(currentDate.value)
  clone.innerHTML = el.innerHTML.replace(/v-for=".*?"/, '')
  expandedHeight.value = clone.scrollHeight + 20

  const oneWeekDays = getCurrentWeekDays.value
  const originalHTML = clone.innerHTML
  clone.innerHTML = ''
  oneWeekDays.forEach(date => {
    const span = document.createElement('span')
    span.className = 'text-xs py-2.5 text-center rounded-xl cursor-pointer'
    span.innerText = date.getDate().toString()
    clone.appendChild(span)
  })

  collapsedHeight.value = clone.scrollHeight + 10
  document.body.removeChild(clone)
}

onMounted(updateHeights)
watch([isExpanded, currentDate], updateHeights)
</script>

<template>
  <div>
    <div
      class="overflow-hidden select-none"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchmove.prevent
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove.prevent
    >
      <div class="flex items-center gap-3 cursor-pointer px-4" @click="toggleCalendar">
        <span
          class="font-semibold transition-colors text-xs"
          :class="{
            'text-text dark:text-(--primary-white)': !isExpanded,
            'text-(--primary-orange)': isExpanded,
          }"
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
              :class="{
                'fill-text dark:fill-(--primary-white)': !isExpanded,
                'fill-(--primary-orange)': isExpanded,
              }"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.808 4.5509L1.136 0.179641C0.864 -0.0598802 0.448 -0.0598802 0.192 0.179641C-0.064 0.419162 -0.064 0.808383 0.192 1.06287L4.4 5L0.192 8.93713C-0.064 9.17665 -0.064 9.58084 0.192 9.82036C0.448 10.0599 0.864 10.0599 1.136 9.82036L5.808 5.43413C6.064 5.19461 6.064 4.80539 5.808 4.5509Z"
            />
          </svg>
        </span>
      </div>

      <div class="mt-2 py-2 grid grid-cols-7 gap-3 text-center px-4">
        <span
          v-for="day in weekDays"
          :key="day"
          class="font-semibold text-(--primary-gray) dark:text-(--secondary-light-gray) text-[10px]"
        >
          {{ day }}
        </span>
      </div>

      <div
        ref="calendarBodyRef"
        class="overflow-hidden transition-[max-height] duration-400 ease-in-out px-4"
        :style="{ maxHeight: isExpanded ? expandedHeight + 'px' : collapsedHeight + 'px' }"
      >
        <div class="grid grid-cols-7 gap-3">
          <span
            v-for="(date, index) in isExpanded
              ? generateMonthDays(currentDate)
              : getCurrentWeekDays"
            :key="date?.toISOString() || index"
            class="text-xs py-2.5 text-center rounded-xl cursor-pointer"
            :class="{
              'bg-(--primary-orange) text-(--primary-white) font-semibold':
                date && selectedDate && date.toDateString() === selectedDate.toDateString(),
              'text-(--primary-orange) font-semibold':
                date && date.toDateString() === today.toDateString(),
              'text-(--primary-gray) font-normal':
                date &&
                date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) &&
                !(date.toDateString() === today.toDateString()),
              'font-bold': !date,
              'dark:text-(--primary-white)':
                date &&
                date.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0) &&
                !(date.toDateString() === today.toDateString()),
            }"
            @click="date && selectDate(date)"
          >
            {{ date ? date.getDate() : '' }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="border-b rounded-b-[15px] border-b-(--medium-gray) dark:border-b-(--third-black-bg)"
    >
      <div
        class="mx-auto my-2.5 h-1 w-8 rounded-full bg-(--medium-gray) dark:opacity-30 cursor-pointer"
        @click="toggleCalendar"
        @mousedown.stop="handleVerticalStart"
        @touchstart.stop="handleTouchVerticalStart"
      ></div>
    </div>
  </div>
</template>
