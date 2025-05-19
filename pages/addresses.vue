<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import IcAdd from '~/icons/IcAdd.vue'
import SelectPointModal from '~/features/trip-form/ui/SelectPointModal.vue'
import EditAddressPopup from '~/features/edit-address/EditAddressPopup.vue'

const isSelectorOpen = ref(false)
const selectedPoints = ref<any[]>([])
const isEditMode = ref(false)

const handleOpenEditor = () => {
  isEditMode.value = false
}

const handleSelectPoint = (point: any) => {
  isEditMode.value = true
  isSelectorOpen.value = false
  // selectedPoints.value.push(point)
}

const handleCloseSelector = () => {
  isSelectorOpen.value = false
}
</script>

<template>
  <div class="pb-24">
    <div class="flex items-center justify-between">
      <PagesTitle title="Мои адреса" />
      <button class="pb-[18px] cursor-pointer" @click="isSelectorOpen = true">
        <IcAdd />
      </button>
    </div>
    <div v-if="isEditMode">
      <EditAddressPopup @close="handleCloseSelector" @select="handleSelectPoint" />
    </div>
    <div v-if="selectedPoints.length > 0" class="mt-4 space-y-2">
      <div
        v-for="(point, idx) in selectedPoints"
        :key="idx"
        class="p-3 bg-(--primary-white) rounded-xl dark:bg-(--secondary-black-bg) flex flex-col"
      >
        <div class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold">
          {{ point.formatted || point.name }}
        </div>
        <div class="text-xs text-(--primary-gray)">
          {{ point.address }}
        </div>
      </div>
    </div>

    <SelectPointModal
      v-if="isSelectorOpen"
      @close="handleCloseSelector"
      @select="handleSelectPoint"
    />
  </div>
</template>
