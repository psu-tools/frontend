<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import IcArrow from '~/icons/IcArrow.vue'
import IcTrash from '~/icons/IcTrash.vue'

const props = defineProps<{
  point: any
}>()

const emit = defineEmits(['close', 'edit', 'delete'])

const isExpanded = ref(false)
const isVisible = ref(true)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const closeModal = () => {
  isExpanded.value = false
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const toggleExpand = () => (isExpanded.value = !isExpanded.value)

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
          'h-6/10 translate-y-0': !isExpanded,
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
          <div class="flex justify-between mb-[25px] gap-[10px]">
            <div class="text-xl text-(--medium-gray) dark:text-(--color-text-dark) font-bold">
              {{ point.name || 'Нет названия' }}
            </div>
            <div class="flex items-center gap-[15px]">
              <button class="cursor-pointer relative z-10" @click="$emit('delete')">
                <IcTrash />
              </button>
              <button class="cursor-pointer relative z-10" @click="closeModal">
                <IcClose />
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-[10px]">
            <div
              class="text-(--color-text-glay) dark:text-(--secondary-gray) text-xs font-semibold"
            >
              Адрес
            </div>
            <div
              class="text-sm text-(--color-text) dark:text-(--primary-white) py-[18px] px-[15px] rounded-3xl bg-(--primary-white) dark:bg-(--secondary-black-bg) mb-[20px] flex justify-between items-center gap-[15px]"
            >
              <p>
                {{ point.address || '—' }}
              </p>
              <IcArrow />
            </div>
          </div>

          <div class="h-[80px]"></div>

          <div
            class="fixed overflow-x-hidden bottom-0 left-0 w-full px-5 pb-[env(safe-area-inset-bottom)] pt-3 bg-(--primary-white-bg) dark:bg-(--primary-black-bg) z-50"
          >
            <div
              class="w-[200%] left-[-50%] h-[1px] bg-(--color-line-gray) dark:bg-(--third-black-bg) relative mb-[10px]"
            ></div>

            <button
              class="w-full py-[15px] mb-2 rounded-2xl text-(--primary-white) text-sm bg-(--primary-orange)"
              @click="$emit('edit')"
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
