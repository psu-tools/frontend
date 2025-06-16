<script setup lang="ts">
import IcWarning from '~/icons/IcWarning.vue'

defineProps<{
  isOpen: boolean
  message: string
  description?: string
}>()

const emit = defineEmits<{ (e: 'onClick'): void }>()
</script>

<template>
  <Transition class="absolute inset-0" name="fade" @click="emit('onClick')">
    <div v-if="isOpen" class="w-full h-full bg-black/20 flex justify-center items-center z-10">
      <div
        @click.stop
        class="w-5/6 bg-(--primary-white) dark:bg-(--secondary-black-bg) flex flex-col justify-between items-center p-5 rounded-(--radius-2xl)"
      >
        <div class="w-16 h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stop-color="#FF724C"></stop>
              <stop offset=".3" stop-color="#FF724C" stop-opacity=".9"></stop>
              <stop offset=".6" stop-color="#FF724C" stop-opacity=".6"></stop>
              <stop offset=".8" stop-color="#FF724C" stop-opacity=".3"></stop>
              <stop offset="1" stop-color="#FF724C" stop-opacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              stroke-width="15"
              stroke-linecap="round"
              stroke-dasharray="200 1000"
              stroke-dashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#FF724C"
              stroke-width="15"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </div>
        <p
          class="px-8 text-center mt-[15px] text-(--color-text) dark:text-(--primary-white) font-semibold text-sm"
        >
          {{ message }}
        </p>
        <p v-if="description" class="px-8 text-center text-xs text-(--primary-gray) mt-2">
          {{ description }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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
