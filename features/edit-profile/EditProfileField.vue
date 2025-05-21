<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'

import { useUserInfo } from '~/stores/userInfo'

const userInfoStore = useUserInfo()

import IcClose from '~/icons/IcClose.vue'

const props = defineProps<{
  label: string
  value: string
  field: keyof Pick<UserInfo, 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'telegramId'>
}>()

const emit = defineEmits(['close', 'save'])

const isExpanded = ref(false)
const isVisible = ref(false)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const localValue = ref(props.value)

const closeModal = () => {
  isExpanded.value = false
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const save = async () => {
  try {
    const updatedValue = props.field === 'telegramId' ? Number(localValue.value) : localValue.value

    await userInfoStore.updateUserInfo({
      [props.field]: updatedValue,
    })

    await userInfoStore.getUserInfo()

    closeModal()
  } catch (error) {
    console.error('Ошибка при сохранении:', error)
  }
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

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 50)
})
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="absolute inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
      @click.self="closeModal"
    >
      <div
        class="w-full bg-(--primary-white-bg) dark:bg-(--primary-black-bg) rounded-t-3xl px-5 transition-all duration-300 touch-none overflow-auto scrollbar-hide"
        :class="{
          'h-4/10 translate-y-0': !isExpanded,
          'h-9/10 translate-y-0': isExpanded,
          'translate-y-full': !isVisible,
        }"
        @click.stop
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          @click="toggleExpand"
          class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[15px]"
        ></div>
        <div class="relative">
          <div class="flex justify-between mb-[25px] gap-[15px]">
            <div class="text-xl text-(--color-text) dark:text-(--primary-white) font-bold">
              {{ label }}
            </div>
            <button class="cursor-pointer relative z-10" @click="closeModal">
              <IcClose />
            </button>
          </div>
          <div class="">
            <input
              class="w-full outline-none text-(--color-text) dark:text-(--primary-white) font-normal py-[18px] px-[15px] rounded-3xl mb-[20px] bg-(--primary-white) border-1 border-(--light-input-border) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) text-sm"
              v-model="localValue"
              :placeholder="label"
            />
          </div>
          <div class="h-[80px]"></div>
          <div
            class="fixed overflow-x-hidden bottom-0 left-0 w-full px-5 pb-[env(safe-area-inset-bottom)] pt-3 bg-(--primary-white-bg) dark:bg-(--primary-black-bg) z-50"
          >
            <div
              class="w-[200%] left-[-50%] h-[1px] bg-(--color-line-gray) dark:bg-(--third-black-bg) relative mb-[10px]"
            ></div>
            <PrimaryOrangeButton class="py-[15px] rounded-(--radius-2xl) mb-[20px]" @click="save">
              Сохранить
            </PrimaryOrangeButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
