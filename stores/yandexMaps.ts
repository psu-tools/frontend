import { defineStore } from 'pinia'

export const useYandexMapsModalStore = defineStore('yandexMapsModal', () => {
  const isOpen = ref(false)
  const selectedPoint = ref<Point>()

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const selectPoint = (point: Point) => {
    selectedPoint.value = point
    closeModal()
  }

  return {
    isOpen,
    selectedPoint,
    openModal,
    closeModal,
    selectPoint,
  }
})
