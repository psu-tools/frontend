<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import StopsInput from '~/features/trip-form/ui/StopsInput.vue'
import PointSelector from '~/features/trip-form/ui/PointSelector.vue'
import { useAddTripModalStore } from '~/stores/addTripModal'
import { useTripFormStore } from '~/stores/tripForm'
import PickerSelectPopup from '~/features/picker-modal/ui/PickerSelectPopup.vue'

const addTripModalStore = useAddTripModalStore()
const tripFormStore = useTripFormStore()

const emit = defineEmits(['close'])

const isExpanded = ref(addTripModalStore.isModalExpanded)
const isVisible = ref(addTripModalStore.isModalOpen)

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

const stopsList = ref([{ name: 'Моё местоположение' }, { name: 'Куда поедем?' }])

const openPointSelector = (index: number) => {
  activePointIndex.value = index
  isPointSelectorOpen.value = true
}

const closePointSelector = () => {
  isPointSelectorOpen.value = false
  activePointIndex.value = null
}

const updateStop = (newValue: string) => {
  if (activePointIndex.value !== null) {
    stopsList.value[activePointIndex.value].name = newValue
  }
  closePointSelector()
}
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="absolute inset-0 z-40 flex justify-center items-end bg-black/20 transition-opacity duration-300"
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
          v-if="!isPointSelectorOpen"
          @submit.prevent
          class="w-full flex justify-center flex-col"
        >
          <div
            class="sticky left-0 top-0 z-40 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
          >
            <div
              @click="toggleExpand"
              class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
            ></div>

            <div class="mb-4">
              <div class="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Название поездки"
                  class="text-2xl font-bold text-text dark:text-(--color-text-dark) outline-none caret-(--primary-orange)"
                />
                <button @click="closeModal" class="cursor-pointer">
                  <IcClose />
                </button>
              </div>
            </div>
          </div>

          <div
            class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl py-[16px] pl-[15px] pr-[5px]"
          >
            <StopsInput :stopsList="stopsList" @open-selector="openPointSelector" />
          </div>

          <div class="mt-[25px] space-y-[15px]">
            <div
              class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5"
            >
              <p class="text-sm text-(--color-text) dark:text-(--primary-white)">Дата</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 text-sm text-(--color-text) dark:text-(--primary-white) rounded-xl cursor-pointer"
                @click="isDayMonthYearPopupOpen = true"
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
              class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5"
            >
              <p class="text-sm text-(--color-text) dark:text-(--primary-white)">Время прибытия</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 text-sm text-(--color-text) dark:text-(--primary-white) rounded-xl cursor-pointer"
                @click="isTimePopupOpen = true"
              >
                {{ tripFormStore?.arrivalTime }}
              </p>
            </div>

            <div
              class="bg-(--primary-white) dark:bg-(--secondary-black-bg) rounded-2xl flex justify-between items-center py-2.5 pl-[15px] pr-2.5"
            >
              <p class="text-sm text-(--color-text) dark:text-(--primary-white)">Напоминание</p>
              <p
                class="bg-(--secondary-white-bg) dark:bg-(--third-black-bg) py-2 px-2.5 text-sm text-(--color-text) dark:text-(--primary-white) rounded-xl cursor-pointer"
                @click="isReminderPopupOpen = true"
              >
                За {{ tripFormStore?.reminderTime }} минут
              </p>
            </div>
          </div>

          <PickerSelectPopup v-if="isTimePopupOpen" @close="isTimePopupOpen = false" type="time" />

          <PickerSelectPopup
            v-if="isReminderPopupOpen"
            @close="isReminderPopupOpen = false"
            type="reminder"
          />

          <PickerSelectPopup
            v-if="isDayMonthYearPopupOpen"
            @close="isDayMonthYearPopupOpen = false"
            type="date"
          />
        </form>
        <Transition name="fade" appear>
          <PointSelector
            v-if="isPointSelectorOpen"
            :initialValue="activePointIndex !== null ? stopsList[activePointIndex].name : ''"
            @close="closePointSelector"
            @select="updateStop"
            @toggle-expand="toggleExpand"
          />
        </Transition>
      </div>

      <div
        v-if="!isPointSelectorOpen && !isDayMonthYearPopupOpen"
        class="absolute bottom-0 left-0 bg-(--primary-white-bg)/40 dark:bg-(--primary-black-bg)/40 backdrop-blur-2xl w-full border-t border-(--medium-gray) dark:border-(--third-black-bg) pt-2.5 pb-10 px-5 flex justify-center items-center"
      >
        <button
          class="bg-(--primary-yellow) py-4 w-full rounded-2xl text-(--primary-white) disabled:opacity-60"
          disabled
        >
          Добавить поездку
        </button>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
