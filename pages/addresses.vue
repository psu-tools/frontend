<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import SelectPointModal from '~/features/trip-form/ui/SelectPointModal.vue'
import EditAddressPopup from '~/features/edit-address/EditAddressPopup.vue'
import PointActionsModal from '~/features/edit-address/PointActionsModal.vue'

import IcAdd from '~/icons/IcAdd.vue'

import { useUserPointsStore } from '~/stores/userPoints'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'

const ymapsStore = useYandexMapsModalStore()

const userPointsStore = useUserPointsStore()
const { fetchUserPoints, addUserPoint } = userPointsStore
const { favoritePoints, isLoading } = storeToRefs(userPointsStore)

const isSelectorOpen = ref(false)
const isEditMode = ref(false)
const pointToEdit = ref<any | null>(null)
const selectedPointForActions = ref<any | null>(null)
const isPointActionsOpen = ref(false)

const isEditPopupOpen = ref(false)
const popupMode = ref<'add' | 'edit'>('edit')

const handleSelectPoint = (point: any) => {
  ymapsStore.closeModal()
  if (isSelectorOpen.value) {
    pointToEdit.value = point
    popupMode.value = 'add'
    isEditPopupOpen.value = true
    isSelectorOpen.value = false
  } else {
    selectedPointForActions.value = point
    isPointActionsOpen.value = true
  }
}
const handleEditPoint = () => {
  pointToEdit.value = selectedPointForActions.value
  popupMode.value = 'edit'
  isEditPopupOpen.value = true
  isPointActionsOpen.value = false
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

const closeEditPopup = () => {
  isEditPopupOpen.value = false
  pointToEdit.value = null
  popupMode.value = 'edit'
}

const closeSelector = () => {
  isSelectorOpen.value = false
}

const closePointActions = () => {
  isPointActionsOpen.value = false
  selectedPointForActions.value = null
}

const openNewPointSelector = () => {
  isSelectorOpen.value = true
}

onMounted(() => {
  fetchUserPoints()
})
</script>

<template>
  <div class="pb-24">
    <div class="flex items-start justify-between">
      <PagesTitle :title="$t('myAddressesTitle')" />
      <button class="cursor-pointer" @click="openNewPointSelector">
        <IcAdd />
      </button>
    </div>

    <EditAddressPopup
      v-if="isEditPopupOpen && pointToEdit"
      :point="pointToEdit"
      :mode="popupMode"
      @close="closeEditPopup"
      @save="handleSaveEditedPoint"
    />

    <PointActionsModal
      v-if="isPointActionsOpen && selectedPointForActions"
      :point="selectedPointForActions"
      @close="closePointActions"
      @edit="handleEditPoint"
    />

    <div v-if="isLoading" class="text-center py-8 text-(--primary-gray)">
      {{ $t('loadingMessage') }}
    </div>

    <div v-else-if="favoritePoints?.length" class="mt-4 space-y-2">
      <div
        v-for="(point, idx) in favoritePoints"
        :key="point.id || idx"
        @click="handleSelectPoint(point)"
        class="hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) cursor-pointer py-[13px] px-[20px] bg-(--primary-white-bg) rounded-2xl dark:bg-(--secondary-black-bg) flex flex-col"
      >
        <div class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold">
          {{ point.formatted || point.name || 'Без названия' }}
        </div>
        <div class="text-xs text-(--primary-gray)">
          {{ point.address || point.formatted || '—' }}
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-(--primary-gray)">{{ $t('noAddressesAdded') }}</div>

    <SelectPointModal v-if="isSelectorOpen" @close="closeSelector" @select="handleSelectPoint" />
  </div>
</template>
