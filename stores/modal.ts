import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const isInnerModalOpen = ref(false)
  const tripData = ref<Trip | null>(null)

  function openModal(trip: Trip) {
    tripData.value = trip
    isOpen.value = true
  }

  function closeModal() {
    tripData.value = null
    isOpen.value = false
  }

  function openInnerModal() {
    isInnerModalOpen.value = true
  }

  function closeInnerModal() {
    isInnerModalOpen.value = false
  }

  return {
    isOpen,
    isInnerModalOpen,
    tripData,
    openModal,
    closeModal,
    openInnerModal,
    closeInnerModal,
  }
})
