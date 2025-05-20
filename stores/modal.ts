import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const tripData = ref<Trip>()

  const openModal = (trip: Trip) => {
    tripData.value = trip
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    tripData,
    openModal,
    closeModal,
  }
})
