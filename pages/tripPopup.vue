<script setup lang="ts">
import { useModalStore } from '~/stores/modal'
import { useTripsStore } from '~/stores/trips'

import PopupDestination from '~/entities/popup/PopupDestination.vue'

import IcTrash from '~/icons/IcTrash.vue'
import IcClose from '~/icons/IcClose.vue'

const modalStore = useModalStore()
const tripsStore = useTripsStore()
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
    modalStore.closeModal()
  }, 300)
}

watchEffect(() => {
  if (modalStore.isOpen) {
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

const stopsList = computed(() => modalStore?.tripData?.route)

console.log('asdsd', stopsList)
</script>
<template>
  <Teleport to="#modal-container">
    <div
      v-if="modalStore.isOpen"
      class="absolute inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
      @click="closeModal"
    >
      <div
        class="w-full bg-(--primary-white-bg) items-end rounded-t-3xl pt-2 px-5 transition-all duration-300 touch-none"
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
        <div class="w-full flex justify-center flex-col">
          <div
            @click="toggleExpand"
            class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
          ></div>
          <div class="mb-[15px]">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-text">
                {{ modalStore?.tripData?.name }}
              </h2>
              <div class="flex gap-3">
                <button class="cursor-pointer">
                  <IcTrash />
                </button>
                <button @click="closeModal" class="cursor-pointer">
                  <IcClose />
                </button>
              </div>
            </div>
            <p>{{ tripsStore.formatDate(modalStore?.tripData?.arrivalDateTime) }}</p>
          </div>
          <div class="flex flex-col gap-[25px] mt-[25px]">
            <div class="bg-(--primary-white) rounded-2xl pt-[16px] pl-[15px] pr-[5px] pb-[16px]">
              <PopupDestination :stops-list="stopsList" />
            </div>
            <div class=""></div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
