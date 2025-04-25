<script setup lang="ts">
const props = defineProps<{ initialTime?: string }>()

const emit = defineEmits<{ (e: 'select', value: string): void }>()

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

const selectedHourIndex = ref(0)
const selectedMinuteIndex = ref(0)

const paddedHours = computed(() => [0, ...hours, 0])
const paddedMinutes = computed(() => [0, ...minutes, 0])

const itemHeight = 48
const visibleItems = 3
const paddingOffset = Math.floor(visibleItems / 2) * itemHeight

const selectedTime = computed(() => {
  const hour = hours[selectedHourIndex.value]
  const minute = minutes[selectedMinuteIndex.value]
  return `${hour}:${minute}`
})

const scrollToIndex = (el: HTMLElement | null, index: number) => {
  if (!el) return
  el.scrollTop = (index + 1) * itemHeight - paddingOffset
}

const getCurrentIndex = (scrollTop: number) =>
  Math.round((scrollTop + paddingOffset) / itemHeight) - 1

const onScrollHour = (event: Event) => {
  const el = event.target as HTMLElement
  const index = getCurrentIndex(el.scrollTop)
  if (index < 0 || index >= hours.length) return
  selectedHourIndex.value = index
}

const onScrollMinute = (event: Event) => {
  const el = event.target as HTMLElement
  const index = getCurrentIndex(el.scrollTop)
  if (index < 0 || index >= minutes.length) return
  selectedMinuteIndex.value = index
}

const hourCol = ref<HTMLElement | null>(null)
const minuteCol = ref<HTMLElement | null>(null)

onMounted(() => {
  const initial = props.initialTime ?? '00:00'
  const [initialHour, initialMinute] = initial.split(':').map(part => parseInt(part, 10))

  selectedHourIndex.value = isNaN(initialHour) ? 0 : initialHour
  selectedMinuteIndex.value = isNaN(initialMinute) ? 0 : initialMinute

  nextTick(() => {
    scrollToIndex(hourCol.value, selectedHourIndex.value)
    scrollToIndex(minuteCol.value, selectedMinuteIndex.value)
  })
})

watch([selectedHourIndex, selectedMinuteIndex], () => {
  emit('select', selectedTime.value)
})
</script>

<template>
  <div class="relative dark:text-(--primary-white)">
    <div class="relative z-10 flex gap-6 items-center justify-center">
      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="hourCol"
        @scroll.passive="onScrollHour"
      >
        <div
          v-for="(hour, i) in paddedHours"
          :key="'hour-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{ 'opacity-50': hour !== 0 && i - 1 !== selectedHourIndex }"
        >
          {{ hour || '' }}
        </div>
      </div>

      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="minuteCol"
        @scroll.passive="onScrollMinute"
      >
        <div
          v-for="(minute, i) in paddedMinutes"
          :key="'month-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{ 'opacity-50': minute !== 0 && i - 1 !== selectedMinuteIndex }"
        >
          {{ minute || '' }}
        </div>
      </div>
    </div>
    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-2.5 items-center justify-center"
    >
      <div
        class="w-[75px] h-[45px] bg-(--secondary-white-bg) dark:bg-(--third-black-bg) rounded-xl"
      />
      :
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
