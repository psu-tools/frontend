<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import SelectPointModal from '~/features/trip-form/ui/SelectPointModal.vue'
import EditAddressPopup from '~/features/edit-address/EditAddressPopup.vue'
import PointActionsModal from '~/features/edit-address/PointActionsModal.vue'

import IcAdd from '~/icons/IcAdd.vue'

import { useUserPointsStore } from '~/stores/userPoints'

const userPointsStore = useUserPointsStore()
const { fetchUserPoints, addUserPoint, deleteUserPoint } = userPointsStore
const { favoritePoints, isLoading } = storeToRefs(userPointsStore)

const isSelectorOpen = ref(false)
const isEditMode = ref(false)
const pointToEdit = ref<any | null>(null)
const selectedPointForActions = ref<any | null>(null)
const isPointActionsOpen = ref(false)

const handleSelectPoint = (point: any) => {
  selectedPointForActions.value = point
  isPointActionsOpen.value = true
  console.log(point)
}

const handleEditPoint = () => {
  pointToEdit.value = selectedPointForActions.value
  isEditMode.value = true
  isPointActionsOpen.value = false
}

const handleDeletePoint = async (point: any) => {
  if (!point?.id) {
    console.warn('Нет ID точки для удаления')
    return
  }

  try {
    await deleteUserPoint(point.id)
    isPointActionsOpen.value = false
  } catch (error) {
    console.error('Не удалось удалить точку', error)
  }
}

const handleSaveEditedPoint = async (point: any) => {
  try {
    await addUserPoint(point)
    await fetchUserPoints()
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

    <!-- Popup редактирования -->
    <EditAddressPopup
      v-if="isEditMode && pointToEdit"
      :point="pointToEdit"
      @close="handleCloseSelector"
      @save="handleSaveEditedPoint"
    />

    <!-- Модалка действий с точкой -->
    <PointActionsModal
      v-if="isPointActionsOpen && selectedPointForActions"
      :point="selectedPointForActions"
      @close="isPointActionsOpen = false"
      @edit="handleEditPoint"
      @delete="() => handleDeletePoint(selectedPointForActions)"
    />

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="text-center py-8 text-gray-500">Загрузка...</div>

    <div v-else-if="favoritePoints?.length" class="mt-4 space-y-2">
      <div
        v-for="(point, idx) in favoritePoints"
        :key="point.id || idx"
        @click="handleSelectPoint(point)"
        class="cursor-pointer py-[13px] px-[20px] bg-(--primary-white) rounded-2xl dark:bg-(--secondary-black-bg) flex flex-col"
      >
        <div class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold">
          {{ point.formatted || point.name || 'Без названия' }}
        </div>
        <div class="text-xs text-(--primary-gray)">
          {{ point.address || point.formatted || '—' }}
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
