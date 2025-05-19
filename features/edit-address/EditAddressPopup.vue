<script setup lang="ts">
import PointSelector, { type SuggestionPoint } from '~/features/trip-form/ui/PointSelector.vue'

const emit = defineEmits(['close', 'select'])

const props = defineProps<{
  initialValue?: string
}>()

const isExpanded = ref(false)
const isVisible = ref(true)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const showModal = () => (isVisible.value = true)

const closeModal = () => {
  isExpanded.value = false
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const toggleExpand = () => (isExpanded.value = !isExpanded.value)

const onTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0].clientY
}

const onTouchMove = (event: TouchEvent) => {
  touchMoveY.value = event.touches[0].clientY
}

const onTouchEnd = () => {
  const deltaY = touchStartY.value - touchMoveY.value

  if (deltaY > 50) {
    isExpanded.value = true
  } else if (deltaY < -50) {
    if (isExpanded.value) {
      isExpanded.value = false
    } else {
      closeModal()
    }
  }
}

const selectPoint = (point: SuggestionPoint | Point, pointType: 'api' | 'user') => {
  emit('select', point, pointType)
  closeModal()
}
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="absolute inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
      @click.self="closeModal"
    >
      <div
        class="w-full bg-(--primary-white-bg) dark:bg-(--primary-black-bg) rounded-t-3xl px-5 transition-all duration-300 touch-none overflow-auto scrollbar-hide"
        :class="{
          'h-6/10 translate-y-0': !isExpanded,
          'h-9/10 translate-y-0': isExpanded,
          'translate-y-full': !isVisible,
        }"
        @click.stop
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="">
          <div class="">Название</div>
          <div class="">
            <div class="">Адрес</div>
            <div class=""></div>
          </div>
        </div>
        <!-- <PointSelector
          :initial-value="initialValue"
          :index="null"
          @close="closeModal"
          @selectPoint="selectPoint"
          @toggle-expand="toggleExpand"
        /> -->
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  scrollbar-width: none;
}
</style>
