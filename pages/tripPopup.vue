<template>
  <Teleport to="body">
    <div
      v-if="modal.isOpen"
      class="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-end bg-black/20"
      @click="modal.closeModal"
    >
      <div
        class="w-full bg-(--primary-white) items-end rounded-tl-2xl rounded-tr-2xl pt-[10px] pr-[20px] pl-[20px] transition-all duration-300"
        :class="{
          'h-6/10': !isExpanded,
          'h-9/10': isExpanded,
        }"
        @click.stop
      >
        <div class="w-full flex justify-center">
          <div
            @click="toggleExpand"
            class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer"
          ></div>
        </div>
        <button @click="modal.closeModal">Закрыть</button>
        <h2>{{ modal.tripData }}</h2>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useModalStore } from '~/stores/modal'

const modal = useModalStore()
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>
