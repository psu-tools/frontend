<script setup lang="ts">
import Folder from '~/shaared/illustrations/Folder.vue'
import { useAddTripModalStore } from '~/stores/addTripModal'

const store = useAddTripModalStore()

const openBottomSheet = () => store.openModal()
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-8">
      <Folder />
      <div class="space-y-2.5 text-center">
        <p class="text-(--color-text)/80 dark:text-(--primary-white) font-semibold">
          {{ $t('noTripsMessageTitle') }}
        </p>
        <p class="text-(--primary-light-gray)">{{ $t('noTripsMessageDescription') }}</p>
      </div>
      <button
        class="py-2.5 px-[30px] rounded-xl bg-(--primary-orange) hover:bg-(--primary-orange-hover) text-(--primary-white) cursor-pointer"
        @click="openBottomSheet"
      >
        {{ $t('noTripsMessageButton') }}
      </button>
    </div>
  </div>
</template>
