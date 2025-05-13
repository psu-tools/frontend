<script setup lang="ts">
const props = defineProps<{ initialPercentage?: number }>()

const emit = defineEmits<{ (e: 'select', value: number): void }>()

const percentages = Array.from({ length: 20 }, (_, i) => (i + 1) * 5)
const paddedPercentages = computed(() => [null, ...percentages, null])

const selectedPercentageIndex = ref(0)
const itemHeight = 48
const visibleItems = 3
const paddingOffset = Math.floor(visibleItems / 2) * itemHeight
// const percentageCol = ref<HTMLElement | null>(null)

const selectedPercentage = computed(() => percentages[selectedPercentageIndex.value])

const scrollToIndex = (el: HTMLElement | null, index: number) => {
  if (!el) return
  el.scrollTop = (index + 1) * itemHeight - paddingOffset
}

const getCurrentIndex = (scrollTop: number) =>
  Math.round((scrollTop + paddingOffset) / itemHeight) - 1

const onScroll = (event: Event) => {
  const el = event.target as HTMLElement
  const index = getCurrentIndex(el.scrollTop)
  if (index < 0 || index >= percentages.length) return
  selectedPercentageIndex.value = index
}

onMounted(() => {
  const initial = props.initialPercentage ?? 5
  const initialIndex = percentages.indexOf(initial)
  selectedPercentageIndex.value = initialIndex === -1 ? 0 : initialIndex
  nextTick(() => scrollToIndex(percentageCol.value, selectedPercentageIndex.value))
})

watch(selectedPercentageIndex, () => {
  emit('select', selectedPercentage.value)
})
</script>

<template>
  <div class="relative dark:text-(--primary-white)">
    <div class="relative z-10 flex gap-6 items-center justify-center">
      <div
        class="w-[75px] h-[124px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        ref="percentageCol"
        @scroll.passive="onScroll"
      >
        <div
          v-for="(percent, i) in paddedPercentages"
          :key="'percent-' + i"
          class="h-12 flex items-center justify-center snap-center text-sm"
          :class="{ 'opacity-50': percent !== null && i - 1 !== selectedPercentageIndex }"
        >
          {{ percent !== null ? percent + '%' : '' }}
        </div>
      </div>
    </div>
    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-2.5 items-center justify-center"
    >
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
