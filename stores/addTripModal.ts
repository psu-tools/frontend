import { defineStore } from 'pinia'

export const useAddTripModalStore = defineStore('addTripModal', () => {
  const isModalOpen = ref(false)

  const closeModal = () => (isModalOpen.value = false)
  const openModal = () => {
    isModalOpen.value = true
    console.log(isModalOpen.value, 'yup')
  }
  return {
    isModalOpen,
    closeModal,
    openModal,
  }
})
