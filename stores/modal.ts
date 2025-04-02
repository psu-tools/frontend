import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    tripData: null as any | null,
  }),
  actions: {
    openModal(trip: Trip) {
      this.tripData = trip
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
      this.tripData = null
    },
  },
})
