import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const tripData = ref<Trip | null>(null)

  const openModal = (trip: Trip) => {
    tripData.value = trip
    isOpen.value = true
  }

  const closeModal = () => {
    tripData.value = null
    isOpen.value = false
  }

  return {
    isOpen,
    tripData,
    openModal,
    closeModal,
  }
})
