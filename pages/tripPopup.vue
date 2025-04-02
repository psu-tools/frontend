<template>
  <Teleport to="body">
    <div
      v-if="modal.isOpen"
      class="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-end bg-black/20"
      @click="modal.closeModal"
    >
      <div
        class="w-full h-3/5 bg-white items-end rounded-tl-2xl rounded-tr-2xl pt-[10px] pr-[20px] pl-[20px]"
        @click.stop
      >
        <div class="w-full">
          <div class="w-40 h-3 bg-(--light-gray)"></div>
        </div>
        <button @click="modal.closeModal"></button>
        <h2>{{ modal.tripData }}</h2>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useModalStore } from '~/stores/modal'

const modal = useModalStore()
</script>
