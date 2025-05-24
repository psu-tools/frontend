<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import IcClock from '~/icons/IcClock.vue'
import TimeReservePopup from '~/shaared/ui/TimeReservePopup.vue'
import { useUserInfo } from '~/stores/userInfo'

const userInfoStore = useUserInfo()

const isPopupOpen = ref(false)
const selectedPercentage = ref(userInfoStore.userInfo?.userPreferences.overtimeMultiplier || 5)

const openPopup = () => {
  isPopupOpen.value = true
}

const handleSelect = (value: number) => {
  selectedPercentage.value = value
}

watch(selectedPercentage, () => {
  setTimeout(() => {
    userInfoStore.updateUserInfo({
      userPreferences: {
        overtimeMultiplier: selectedPercentage.value,
      },
    })
  }, 300)
  console.log(selectedPercentage.value)
})

onMounted(async () => {
  if (!userInfoStore.userInfo) {
    await userInfoStore.getUserInfo()
  }
})
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
        <p
          class="px-[30px] flex irems-center justify-center text-xs text-center text-(--primary-gray)"
        >
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
      <transition
        name="modal-fade"
        appear
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <TimeReservePopup
          v-if="isPopupOpen"
          :initial-percentage="selectedPercentage"
          @select="handleSelect"
          @close="isPopupOpen = false"
        />
      </transition>
    </Teleport>
  </div>
</template>
