import { defineStore } from 'pinia'

export const useYandexMapsModalStore = defineStore('yandexMapsModal', () => {
  const isOpen = ref(false)
  const selectedPoint = ref<Point | null>(null)

  const openModal = () => (isOpen.value = true)

  const closeModal = () => (isOpen.value = false)

  const clearPoint = () => (selectedPoint.value = null)

  const selectPoint = (point: Point) => (selectedPoint.value = point)

  return {
    isOpen,
    selectedPoint,
    openModal,
    closeModal,
    selectPoint,
    clearPoint,
  }
})
