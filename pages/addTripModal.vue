<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import StopsInput from '~/features/trip-form/ui/StopsInput.vue'

const isExpanded = ref(false)
const isVisible = ref(false)

const touchStartY = ref(0)
const touchMoveY = ref(0)

const showModal = () => {
  isVisible.value = true
}

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
    showModal()
  }, 10)
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="absolute inset-0 z-50 flex justify-center items-end bg-black/20 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
      @click="closeModal"
    >
      <div
        class="w-full bg-(--primary-white-bg) items-end rounded-t-3xl px-5 transition-all duration-300 touch-none overflow-auto scrollbar-hide pb-[120px]"
        :class="{
          'h-6/10 translate-y-0': isExpanded,
          'h-9/10 translate-y-0': !isExpanded,
          'translate-y-full': !isVisible,
        }"
        @click.stop
        ref="popup"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <form class="w-full flex justify-center flex-col">
          <div class="sticky left-0 top-0 z-40 bg-(--primary-white-bg)">
            <div
              @click="toggleExpand"
              class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
            ></div>

            <div class="mb-4">
              <div class="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Название поездки"
                  class="text-2xl font-bold text-text outline-none caret-(--primary-orange)"
                />
                <button @click="closeModal" class="cursor-pointer">
                  <IcClose />
                </button>
              </div>
            </div>
            <div class="bg-(--primary-white) rounded-2xl py-[16px] pl-[15px] pr-[5px]">
              <StopsInput />
            </div>
          </div>
          <div
            class="absolute w-full left-0 bottom-0 border-t border-(--medium-gray) pt-2.5 pb-10 px-5 flex justify-center items-center"
          >
            <button
              class="bg-(--primary-yellow) py-4 w-full rounded-2xl text-(--primary-white) disabled:opacity-60"
              disabled
            >
              Добавить поездку
            </button>
          </div>
        </form>
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
</style>
