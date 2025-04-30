<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import StopsInput from '~/features/trip-form/ui/StopsInput.vue'
import PointSelector, { type SuggestionPoint } from '~/features/trip-form/ui/PointSelector.vue'
import { useAddTripModalStore } from '~/stores/addTripModal'
import { useTripFormStore } from '~/stores/tripForm'
import PickerSelectPopup from '~/features/picker-modal/ui/PickerSelectPopup.vue'
import TransportSelect from '~/features/transport-select/ui/TransportSelect.vue'
import IcBack from '~/icons/IcBack.vue'
import RoutesContainer from '~/entities/route/RoutesContainer.vue'
import RouteDestination from '~/entities/route/RouteDestination.vue'
import PrimaryYellowButton from '~/shaared/ui/buttons/PrimaryYellowButton.vue'
import BottomSheetBottomBar from '~/shaared/ui/BottomSheetBottomBar.vue'

const addTripModalStore = useAddTripModalStore()
const tripFormStore = useTripFormStore()

const emit = defineEmits(['close'])

const isExpanded = ref(addTripModalStore.isModalExpanded)
const isVisible = ref(addTripModalStore.isModalOpen)

const partOfForm = ref<1 | 2>(1)

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

const isDayMonthYearPopupOpen = ref(false)
const isTimePopupOpen = ref(false)
const isReminderPopupOpen = ref(false)
const isStopTimePopupOpen = ref(false)

const toggleExpand = () => (isExpanded.value = !isExpanded.value)

const onTouchStart = (event: TouchEvent) => (touchStartY.value = event.touches[0].clientY)

const onTouchMove = (event: TouchEvent) => (touchMoveY.value = event.touches[0].clientY)

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

onMounted(() => {
  setTimeout(() => {
    showModal()
  }, 10)
})

const isPointSelectorOpen = ref(false)
const activePointIndex = ref<number | null>(null)
const currentStopPointIndex = ref(0)

const openPointSelector = (index: number) => {
  activePointIndex.value = index
  isPointSelectorOpen.value = true
}

const closePointSelector = () => {
  isPointSelectorOpen.value = false
  activePointIndex.value = null
}

const updateStop = (newValue: SuggestionPoint, pointType: 'api' | 'user') => {
  if (activePointIndex.value !== null) {
    if (pointType === 'api') {
      tripFormStore.updateTripPoint(activePointIndex.value, {
        name: newValue.formatted.split(',')[0],
        latitude: newValue.geometry.lat,
        longitude: newValue.geometry.lng,
        address: newValue.formatted,
      })
    } else if (pointType === 'user') {
      tripFormStore.updateTripPoint(activePointIndex.value, {
        name: newValue.name,
        latitude: newValue.latitude,
        longitude: newValue.longitude,
        address: newValue.address,
      })
    }
  }
  closePointSelector()
}

const onClickStopPoint = (index: number) => {
  currentStopPointIndex.value = index
  isStopTimePopupOpen.value = true
}
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="absolute inset-0 z-20 flex justify-center items-end bg-black/20 transition-opacity duration-300"
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
        <form
          v-if="!isPointSelectorOpen && partOfForm === 1"
          @submit.prevent
          class="w-full flex justify-center flex-col"
        >
          <div
            class="sticky z-10 left-0 top-0 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
          >
            <div
              @click="toggleExpand"
              class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) dark:opacity-30 cursor-pointer mb-[20px]"
            ></div>

            <div class="mb-4">
              <div class="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Название поездки"
                  class="text-2xl font-bold text-text dark:text-(--color-text-dark) outline-none caret-(--primary-orange)"
                  v-model="tripFormStore.tripName"
                />
                <button @click="closeModal" class="cursor-pointer">
                  <IcClose />
                </button>
              </div>
            </div>
          </div>

          <div>
            <StopsInput @open-selector="openPointSelector" />
          </div>

          <div
            v-if="tripFormStore.tripPoints.length > 2"
            class="mt-[25px] space-y-[15px] text-(--color-text) dark:text-(--primary-white) text-sm"
          >
            <div
              v-for="(_, i) in tripFormStore.tripPoints.length - 2"
              class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
              @click="onClickStopPoint(i)"
            >
              <p>Остановка в точке {{ i + 1 }}</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl"
              >
                {{ tripFormStore.tripPoints[i + 1].stopTime }} мин
              </p>
            </div>
          </div>

          <div class="mt-[25px] space-y-[15px]">
            <div
              class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
              @click="isDayMonthYearPopupOpen = true"
            >
              <p>Дата</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl"
              >
                {{
                  tripFormStore.tripDate?.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }}
              </p>
            </div>

            <div
              class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
              @click="isTimePopupOpen = true"
            >
              <p>Время прибытия</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl"
              >
                {{ tripFormStore?.arrivalTime }}
              </p>
            </div>

            <div
              class="transition-colors bg-(--primary-white) hover:bg-(--primary-white-hover) dark:bg-(--secondary-black-bg) dark:hover:bg-(--secondary-black-bg-hover) text-(--color-text) dark:text-(--primary-white) text-sm rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5 cursor-pointer"
              @click="isReminderPopupOpen = true"
            >
              <p>Напоминание</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 rounded-xl"
              >
                за {{ tripFormStore?.reminderTime }} минут
              </p>
            </div>
          </div>

          <Transition name="fade">
            <PickerSelectPopup
              v-if="isStopTimePopupOpen"
              type="stopTime"
              :stop-time-index="currentStopPointIndex + 1"
              @close="isStopTimePopupOpen = false"
            />
          </Transition>

          <Transition name="fade">
            <PickerSelectPopup
              v-if="isDayMonthYearPopupOpen"
              @close="isDayMonthYearPopupOpen = false"
              type="date"
            />
          </Transition>

          <Transition name="fade">
            <PickerSelectPopup
              v-if="isTimePopupOpen"
              @close="isTimePopupOpen = false"
              type="time"
            />
          </Transition>

          <Transition name="fade">
            <PickerSelectPopup
              v-if="isReminderPopupOpen"
              @close="isReminderPopupOpen = false"
              type="reminder"
            />
          </Transition>
        </form>

        <div v-if="partOfForm === 2" class="flex flex-col justify-center">
          <div
            class="sticky left-0 top-0 z-40 bg-(--primary-white-bg) dark:bg-(--primary-black-bg) pb-[15px]"
          >
            <div
              @click="toggleExpand"
              class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) dark:opacity-30 cursor-pointer mb-[20px]"
            ></div>

            <div>
              <div class="flex items-center gap-2.5">
                <button @click.stop="partOfForm = 1" class="cursor-pointer">
                  <IcBack />
                </button>
                <input
                  type="text"
                  placeholder="Название поездки"
                  class="text-2xl font-bold text-text dark:text-(--color-text-dark) outline-none caret-(--primary-orange)"
                  v-model="tripFormStore.tripName"
                />
              </div>
            </div>
          </div>
          <TransportSelect class="mt-2.5" />
          <div
            class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl mt-[25px] py-[16px] pl-[15px] pr-[5px]"
          >
            <RouteDestination :stops-list="tripFormStore.tripPoints" />
          </div>
          <RoutesContainer class="mt-[25px]" :stops-list="tripFormStore.tripPoints" />
        </div>

        <PointSelector
          v-if="isPointSelectorOpen"
          :initialValue="
            activePointIndex !== null ? tripFormStore.tripPoints[activePointIndex].name : ''
          "
          :index="activePointIndex"
          @close="closePointSelector"
          @selectPoint="updateStop"
          @toggle-expand="toggleExpand"
        />
      </div>
      <Transition name="fade">
        <BottomSheetBottomBar
          v-if="
            !isPointSelectorOpen &&
            !isStopTimePopupOpen &&
            !isDayMonthYearPopupOpen &&
            !isReminderPopupOpen &&
            !isTimePopupOpen
          "
        >
          <PrimaryYellowButton
            :disabled="!tripFormStore.isFirstStepValid"
            @click.stop="partOfForm = 2"
            >{{ partOfForm === 1 ? 'Продолжить' : 'Добавить поездку' }}</PrimaryYellowButton
          >
        </BottomSheetBottomBar>
      </Transition>
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

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
