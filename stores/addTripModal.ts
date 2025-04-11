import { defineStore } from 'pinia'

export const useAddTripModalStore = defineStore('addTripModal', () => {
  const isModalOpen = ref(false)
  const isModalExpanded = ref(true)

  const toggleModalOpen = () => isModalOpen.value = !isModalOpen.value

  const toggleModalExpanded = () => isModalExpanded.value = !isModalExpanded.value

  return {
    isModalOpen,
    isModalExpanded,
    toggleModalOpen,
    toggleModalExpanded,
  }
})
