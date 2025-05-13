<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import IcClock from '~/icons/IcClock.vue'
import TimeReservePopup from '~/shaared/ui/TimeReservePopup.vue'

const isPopupOpen = ref(false)
const selectedPercentage = ref(5)

const openPopup = () => {
  isPopupOpen.value = true
}

const handleSelect = (value: number) => {
  selectedPercentage.value = value
}
</script>

<template>
  <div class="pb-24">
    <div class="mb-[50px]">
      <PagesTitle title="Запас времени" />
    </div>
    <div>
      <div
        class="max-w-[280px] flex flex-col py-[20px] pb-[25px] px-[20px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg)"
      >
        <div class="flex justify-center items-center mb-[15px]">
          <IcClock />
        </div>
        <h3
          class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold text-center mb-[10px]"
        >
          Запас времени
        </h3>
        <p class="text-xs text-center mb-[20px] text-(--primary-gray)">
          Дополнительный процент времени, чтобы учесть пробки, задержки и другие непредвиденные
          ситуации
        </p>
      </div>
      <div
        class="py-[18px] px-[15px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg)"
      >
        <div class="flex w-full justify-between items-center">
          <div class="text-sm text-(--color-text) dark:text-(--primary-white)">Текущий запас</div>
          <button
            class="text-sm text-(--color-text) dark:text-(--primary-white) rounded-xl"
            @click="openPopup"
          >
            {{ selectedPercentage }}%
          </button>
        </div>
      </div>
    </div>

    <Teleport to="#modal-container">
      <TimeReservePopup
        v-if="isPopupOpen"
        :initial-percentage="selectedPercentage"
        @select="handleSelect"
        @close="isPopupOpen = false"
      />
    </Teleport>
  </div>
</template>
