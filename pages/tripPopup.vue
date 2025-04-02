<template>
  <Teleport to="body">
    <div
      v-if="modal.isOpen"
      class="fixed inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
      @click="closeModal"
    >
      <div
        class="w-full bg-(--primary-white) items-end rounded-t-2xl pt-2 px-5 transition-all duration-300 touch-none"
        :class="{
          'h-6/10 translate-y-0': !isExpanded,
          'h-9/10 translate-y-0': isExpanded,
          'translate-y-full': !isVisible,
        }"
        @click.stop
        ref="popup"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="w-full flex justify-center">
          <div
            @click="toggleExpand"
            class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer"
          ></div>
        </div>
        <button @click="closeModal" class="absolute top-3 right-5 text-lg">✖</button>
        <h2>
          {{ modal.tripData }}
        </h2>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useModalStore } from '~/stores/modal'

const modal = useModalStore()
const isExpanded = ref(false)
const isVisible = ref(false)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const closeModal = () => {
  isExpanded.value = false
  isVisible.value = false
  setTimeout(() => {
    modal.closeModal()
  }, 300)
}

watchEffect(() => {
  if (modal.isOpen) {
    setTimeout(() => {
      isVisible.value = true
    }, 10)
  }
})

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
</script>
