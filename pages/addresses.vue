<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import SelectPointModal from '~/features/trip-form/ui/SelectPointModal.vue'
import EditAddressPopup from '~/features/edit-address/EditAddressPopup.vue'

import IcAdd from '~/icons/IcAdd.vue'

import { useUserPointsStore } from '~/stores/userPoints'

const userPointsStore = useUserPointsStore()
const { fetchUserPoints, favoritePoints, isLoading, addUserPoint } = userPointsStore

const isSelectorOpen = ref(false)
const selectedPoints = ref<any[]>([])
const isEditMode = ref(false)
const pointToEdit = ref<any | null>(null)

const handleSelectPoint = (point: any) => {
  pointToEdit.value = point
  isEditMode.value = true
  isSelectorOpen.value = false
}

const handleSaveEditedPoint = async (point: any) => {
  try {
    await addUserPoint(point)
    selectedPoints.value.push(point)
  } catch (error) {
    console.error('Не удалось сохранить точку', error)
  } finally {
    isEditMode.value = false
    pointToEdit.value = null
  }
}

const handleCloseSelector = () => {
  isSelectorOpen.value = false
  isEditMode.value = false
  pointToEdit.value = null
}

onMounted(() => {
  fetchUserPoints()
})
</script>

<template>
  <div class="pb-24">
    <div class="flex items-center justify-between">
      <PagesTitle title="Мои адреса" />
      <button class="py-[14px] mb-[10px] cursor-pointer" @click="isSelectorOpen = true">
        <IcAdd />
      </button>
    </div>
    <EditAddressPopup
      v-if="isEditMode && pointToEdit"
      :point="pointToEdit"
      @close="handleCloseSelector"
      @save="handleSaveEditedPoint"
    />
    <div v-if="isLoading" class="text-center py-8 text-gray-500">Загрузка...</div>

    <div v-else-if="favoritePoints?.length" class="mt-4 space-y-2">
      <div
        v-for="(point, idx) in favoritePoints"
        :key="point.id || idx"
        @click="handleSelectPoint(point)"
        class="cursor-pointer py-[13px] px-[20px] bg-(--primary-white) rounded-2xl dark:bg-(--secondary-black-bg) flex flex-col"
      >
        <div class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold">
          {{ point.formatted || point.name }}
        </div>
        <div class="text-xs text-(--primary-gray)">
          {{ point.formatted }}
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-400">Нет добавленных адресов</div>

    <SelectPointModal
      v-if="isSelectorOpen"
      @close="handleCloseSelector"
      @select="handleSelectPoint"
    />
  </div>
</template>
