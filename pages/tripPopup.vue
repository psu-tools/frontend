<script setup lang="ts">
import { useModalStore } from '~/stores/modal'
import { useTripsStore } from '~/stores/trips'

import RouteDestination from '~/entities/route/RouteDestination.vue'
import RoutesContainer from '~/entities/route/RoutesContainer.vue'
import RouteEdit from '~/entities/route/RouteEdit.vue'

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

const isDeleteConfirmOpen = ref(false)

const openDeleteConfirm = () => {
  isDeleteConfirmOpen.value = true
}

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false
}

const confirmDelete = () => {
  console.log('Trip deleted')
  closeDeleteConfirm()
  closeModal()
}
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
        class="w-full bg-(--primary-white-bg) dark:bg-(--primary-black-bg) items-end rounded-t-3xl px-5 transition-all duration-300 touch-none overflow-auto scrollbar-hide pb-[120px]"
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
            class="sticky left-0 top-0 z-40 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
          >
            <div
              @click="toggleExpand"
              class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) dark:opacity-30 cursor-pointer mb-[20px]"
            ></div>
            <div class="mb-[15px]">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-text dark:text-(--primary-white)">
                  {{ modalStore?.tripData?.name }}
                </h2>
                <div class="flex gap-3">
                  <button @click="openDeleteConfirm" class="cursor-pointer">
                    <IcTrash />
                  </button>
                  <button @click="closeModal" class="cursor-pointer">
                    <IcClose />
                  </button>
                </div>
              </div>
              <p class="text-(--primary-gray) font-semibold">
                {{ tripsStore.formatDate(modalStore?.tripData?.arrivalDateTime) }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-[25px] mt-[25px]">
            <div
              class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl pt-[16px] pl-[15px] pr-[5px] pb-[16px]"
            >
              <RouteDestination :stops-list="stopsList" />
            </div>
            <div>
              <RoutesContainer :stops-list="stopsList" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed b-0 l-0 z-20 sm:w-[384px] w-full h-[105px] bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
      >
        <RouteEdit />
      </div>
      <transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDeleteConfirmOpen"
          class="absolute top-0 left-0 right-0 bottom-0 z-60 bg-black/50 flex items-center justify-center"
          @click.stop
        >
          <div
            class="bg-(--primary-white) dark:bg-(--secondary-black-bg) p-5 rounded-2xl w-[300px]"
          >
            <h3
              class="text-lg text-(--color-text) dark:text-(--primary-white) font-semibold text-center mb-[10px]"
            >
              Удалить поездку
            </h3>
            <p
              class="text-sm text-center mb-[20px] text-(--primary-gray) dark:text-(--primary-gray)"
            >
              Вы уверены, что хотите удалить эту поездку?
            </p>
            <div class="flex items-center justify-center gap-[20px]">
              <button
                @click="closeDeleteConfirm"
                class="px-[30px] py-[11px] rounded-[12px] bg-[#F6F6F6] dark:bg-(--third-black-bg) text-(--color-text) dark:text-white"
              >
                Отмена
              </button>
              <button
                @click="confirmDelete"
                class="px-[30px] py-[11px] rounded-[12px] bg-(--primary-red) text-white"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </transition>
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
