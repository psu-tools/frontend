<script setup lang="ts">
const props = defineProps<{ initialReminderTime?: number }>()

const emit = defineEmits<{ (e: 'select', value: number): void }>()

const reminderTimeOptions = Array.from({ length: 20 }, (_, i) => i * 5)

const selectedReminderTimeIndex = ref(0)

const paddedReminderTime = computed(() => [-1, ...reminderTimeOptions, -1])

const itemHeight = 48
const visibleItems = 3
const paddingOffset = Math.floor(visibleItems / 2) * itemHeight

const selectedTime = computed(() => reminderTimeOptions[selectedReminderTimeIndex.value])

const scrollToIndex = (el: HTMLElement | null, index: number) => {
  if (!el) return
  el.scrollTop = (index + 1) * itemHeight - paddingOffset
}

const getCurrentIndex = (scrollTop: number) =>
  Math.round((scrollTop + paddingOffset) / itemHeight) - 1

const onScroll = (event: Event) => {
  const el = event.target as HTMLElement
  const index = getCurrentIndex(el.scrollTop)
  if (index < 0 || index >= reminderTimeOptions.length) return
  selectedReminderTimeIndex.value = index
}

const reminderTimeCol = ref<HTMLElement | null>(null)

onMounted(() => {
  if (props.initialReminderTime !== undefined) {
    const foundIndex = reminderTimeOptions.indexOf(props.initialReminderTime)
    selectedReminderTimeIndex.value = foundIndex !== -1 ? foundIndex : 0
  }

  nextTick(() => scrollToIndex(reminderTimeCol.value, selectedReminderTimeIndex.value))
})

watch([selectedReminderTimeIndex], () => emit('select', selectedTime.value))
</script>

<template>
  <div class="relative dark:text-(--primary-white)">
    <div class="relative z-10 flex gap-6 items-center justify-center">
      <div
        class="w-[120px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="reminderTimeCol"
        @scroll.passive="onScroll"
      >
        <div
          v-for="(time, i) in paddedReminderTime"
          :key="'month-' + i"
          class="h-12 leading-12 text-center snap-center text-sm"
          :class="{
            'opacity-50': i - 1 !== selectedReminderTimeIndex,
            invisible: time === -1,
          }"
        >
          {{ time }} минут
        </div>
      </div>
    </div>
    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-2.5 items-center justify-center"
    >
      <div
        class="w-[120px] h-[45px] bg-(--secondary-white-bg) dark:bg-(--third-black-bg) rounded-xl"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
