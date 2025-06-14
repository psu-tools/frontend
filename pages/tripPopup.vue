<script setup lang="ts">
import { useModalStore } from '~/stores/modal'
import { useTripsStore } from '~/stores/trips'

import RouteDestination from '~/entities/route/RouteDestination.vue'
import RoutesContainer from '~/entities/route/RoutesContainer.vue'
import BaseConfirmModal from '~/features/two-button-modal/BaseConfirmModal.vue'

import IcTrash from '~/icons/IcTrash.vue'
import IcClose from '~/icons/IcClose.vue'
import IcWarn from '~/icons/IcWarn.vue'
import PrimaryYellowButton from '~/shaared/ui/buttons/PrimaryYellowButton.vue'

const modalStore = useModalStore()
const tripsStore = useTripsStore()
const isExpanded = ref(false)
const isVisible = ref(false)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const currentId = ref('')

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
  if (currentId.value) {
    tripsStore.deleteTrip(currentId.value)
  }
  closeDeleteConfirm()
  closeModal()
}

watch(
  () => modalStore.isOpen,
  async isOpen => {
    if (isOpen) {
      isVisible.value = false
      await nextTick()
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    } else {
      isVisible.value = false
    }
  }
)

watch(
  () => modalStore?.tripData,
  newTripData => {
    if (newTripData?.id) {
      currentId.value = newTripData.id
    }
  },
  { immediate: true }
)
</script>
<template>
  <div
    v-show="modalStore.isOpen"
    class="absolute inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    @click="closeModal"
  >
    <div
      class="w-full bg-(--primary-white-bg) dark:bg-(--primary-black-bg) items-end rounded-t-3xl px-5 transition-all duration-300 overflow-auto scrollbar-hide pb-[120px]"
      :class="{
        'h-6/10 translate-y-0': !isExpanded,
        'h-9/10 translate-y-0': isExpanded,
        'translate-y-full': !isVisible,
      }"
    >
      <div class="w-full flex justify-center flex-col">
        <div
          @click.stop
          ref="popup"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          class="sticky left-0 top-0 z-40 bg-(--primary-white-bg) dark:bg-(--primary-black-bg) touch-none"
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
            <p
              v-if="modalStore.tripData?.arrivalDateTime"
              class="text-(--primary-gray) font-semibold"
            >
              {{ tripsStore.formatDate(modalStore.tripData.arrivalDateTime) }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-[25px] mt-[25px]">
          <div
            v-if="stopsList"
            class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl pt-[16px] pl-[15px] pr-[5px] pb-[16px]"
          >
            <RouteDestination :stops-list="stopsList" />
          </div>
          <div>
            <RoutesContainer
              v-if="modalStore.tripData"
              :stops-list="modalStore.tripData?.route"
              :transport-type="modalStore.tripData?.transportType"
              :routes-time="modalStore.tripData?.routeTimes"
              :departure-time="modalStore.tripData?.departureDateTime"
              :arrival-time="modalStore.tripData?.arrivalDateTime"
              :display-routes-time="modalStore.tripData?.displayRouteTimes"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 left-0 bg-(--primary-white-bg)/40 dark:bg-(--primary-black-bg)/40 backdrop-blur-2xl w-full border-t border-(--medium-gray) dark:border-(--third-black-bg) pt-2.5 pb-10 px-5 flex justify-center items-center"
    >
      <PrimaryYellowButton> {{ $t('editTripButton') }} </PrimaryYellowButton>
    </div>
    <BaseConfirmModal
      :is-open="isDeleteConfirmOpen"
      title="Удалить поездку"
      description="Вы уверены, что хотите удалить эту поездку?"
      :icon="IcWarn"
      :confirmText="`Удалить`"
      :cancelText="`Отмена`"
      :onConfirm="confirmDelete"
      :onCancel="closeDeleteConfirm"
    />
  </div>
</template>
<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
}
</style>
