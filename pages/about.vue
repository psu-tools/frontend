<script setup lang="ts">
import Phone from '~/assets/img/phone.png'

const image = ref<HTMLImageElement | null>(null)
const imageWrapper = ref<HTMLElement | null>(null)
const imageHeight = ref(0)

function updateImageHeight() {
  if (image.value) {
    imageHeight.value = image.value.clientHeight
  }
}

onMounted(async () => {
  await nextTick()
  updateImageHeight()
  window.addEventListener('resize', updateImageHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateImageHeight)
})
definePageMeta({
  layout: 'about',
})
</script>

<template>
  <div
    class="w-full min-h-screen pt-[145px] px-5 sm:px-10 md:px-16 lg:px-[180px] xl:px-[240px] 2xl:px-[256px] flex flex-col xl:flex-row justify-between items-end"
  >
    <div
      class="flex flex-col justify-between flex-1 lg:max-w-[600px] mb-10 lg:mb-0"
      :style="{ height: imageHeight + 'px' }"
    >
      <div>
        <div class="mb-[60px] text-5xl lg:text-6xl font-bold">Флоу</div>
        <div class="text-2xl lg:text-4xl leading-[140%]">
          Твой удобный помощник для эффективного планирования поездок
        </div>
      </div>
      <div class="mt-auto text-3xl hidden md:block text-(--color-glay-about) mb-auto">
        PSU Tools
      </div>
    </div>

    <div class="flex justify-end items-start self-end" ref="imageWrapper">
      <img
        :src="Phone"
        alt="Phone"
        class="max-w-full h-auto object-contain"
        @load="updateImageHeight"
        ref="image"
      />
    </div>
  </div>
</template>
