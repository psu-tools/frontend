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
    <div class="mb-[25px]">
      <PagesTitle title="Запас времени" />
    </div>
    <div class="flex flex-col gap-[15px]">
      <div
        class="py-[20px] pb-[25px] px-[20px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg)"
      >
        <div class="flex justify-center items-center mb-[15px]">
          <IcClock />
        </div>
        <h3
          class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold text-center mb-[8px]"
        >
          Запас времени
        </h3>
        <p class="px-[30px] flex irems-center justify-center text-xs text-center text-(--primary-gray)">
          Дополнительный процент времени, чтобы учесть пробки, задержки и другие непредвиденные
          ситуации
        </p>
      </div>
      <div
        class="cursor-pointer py-[10px] px-[15px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg)"
        @click="openPopup"
      >
        <div class="flex w-full justify-between items-center">
          <div class="text-sm text-(--color-text) dark:text-(--primary-white)">Текущий запас</div>
          <button
            class="text-sm text-(--color-text) dark:text-(--primary-white) rounded-[12px] bg-(--secondary-white-bg) py-[8px] px-[16px] dark:bg-(--third-black-bg)"
           
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
 