<script setup lang="ts">
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
import { useUserPointsStore } from '~/stores/userPoints'
import { useTripsStore } from '~/stores/trips'
import AddTripFirstStep from '~/pages/addTripFirstStep.vue'

const { fetchUserPoints } = useUserPointsStore()
const { fetchTrips } = useTripsStore()

const addTripModalStore = useAddTripModalStore()
const tripFormStore = useTripFormStore()

const emit = defineEmits(['close'])

const isExpanded = ref(true)
const isVisible = ref(false)

const partOfForm = ref<1 | 2>(1)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const closeModal = () => {
  isExpanded.value = true
  isVisible.value = false
  setTimeout(() => {
    addTripModalStore.closeModal()
  }, 300)
}

const isDayMonthYearPopupOpen = ref(false)
const isTimePopupOpen = ref(false)
const isReminderPopupOpen = ref(false)
const isStopTimePopupOpen = ref(false)

const toggleDayMonthYearPopup = () =>
  (isDayMonthYearPopupOpen.value = !isDayMonthYearPopupOpen.value)
const toggleTimePopup = () => (isTimePopupOpen.value = !isTimePopupOpen.value)
const toggleReminderPopup = () => (isReminderPopupOpen.value = !isReminderPopupOpen.value)
const toggleStopTimePopup = () => (isStopTimePopupOpen.value = !isStopTimePopupOpen.value)

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
  fetchUserPoints()
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

const updateStop = (newValue: SuggestionPoint | Point, pointType: 'api' | 'user') => {
  if (activePointIndex.value !== null) {
    if (pointType === 'api') {
      const suggestion = newValue as SuggestionPoint
      tripFormStore.updateTripPoint(activePointIndex.value, {
        name: suggestion.formatted.split(',')[0],
        latitude: suggestion.geometry.lat,
        longitude: suggestion.geometry.lng,
        address: suggestion.formatted.split(',').slice(0, -1).join(',').trim(),
      })
    } else if (pointType === 'user') {
      const point = newValue as Point
      tripFormStore.updateTripPoint(activePointIndex.value, {
        name: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        address: point.address,
      })
    }
  }
  closePointSelector()
}

const onClickStopPoint = (index: number) => {
  currentStopPointIndex.value = index
  isStopTimePopupOpen.value = true
}

watch(
  () => addTripModalStore.isModalOpen,
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

const sendForm = () => {
  const isSuccess = tripFormStore.sendForm()
  if (isSuccess) {
    setTimeout(() => {
      isVisible.value = false
      addTripModalStore.closeModal()
      partOfForm.value = 1
    }, 50)
    fetchTrips()
  }
}
</script>

<template>
  <div
    v-show="addTripModalStore.isModalOpen"
    class="absolute inset-0 z-20 flex justify-center items-end bg-black/20 transition-opacity duration-300"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    @click.self="closeModal"
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
      <AddTripFirstStep
        v-if="!isPointSelectorOpen && partOfForm === 1"
        @toggle-expand="toggleExpand"
        @close-modal="closeModal"
        @on-click-stop-point="onClickStopPoint"
        @open-point-selector="openPointSelector"
        @toggle-day-month-year-popup="toggleDayMonthYearPopup"
        @toggle-time-popup="toggleTimePopup"
        @toggle-reminder-popup="toggleReminderPopup"
      />

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
                class="text-2xl font-bold text-(--color-text) dark:text-(--primary-white) outline-none caret-(--primary-orange)"
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
        <RoutesContainer
          class="mt-[25px]"
          :stops-list="tripFormStore.tripPoints"
          :transport-type="[tripFormStore.transportType]"
          :display-routes-time="[]"
          :arrival-time="tripFormStore.arrivalTime"
          :routes-time="['X минут']"
        />
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
          @click.stop="partOfForm === 2 ? sendForm() : (partOfForm = 2)"
          >{{ partOfForm === 1 ? 'Продолжить' : 'Добавить поездку' }}</PrimaryYellowButton
        >
      </BottomSheetBottomBar>
    </Transition>

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
      <PickerSelectPopup v-if="isTimePopupOpen" @close="isTimePopupOpen = false" type="time" />
    </Transition>

    <Transition name="fade">
      <PickerSelectPopup
        v-if="isReminderPopupOpen"
        @close="isReminderPopupOpen = false"
        type="reminder"
      />
    </Transition>
  </div>
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
