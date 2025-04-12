import { defineStore } from 'pinia'

export const useTripFormStore = defineStore('tripForm', () => {
  const tripName = ref<string>('')

  const tripDate = ref<Date>(new Date())

  const arrivalTime = ref<string>(new Date().getHours() + 1 + ':' + new Date().getMinutes())

  const reminderTime = ref<string>('')

  const tripPoints = ref<{ name: string }[]>([])

  const setTripName = (name: string) => {
    tripName.value = name
  }

  const setTripDate = (date: Date) => {
    tripDate.value = date
  }

  const setArrivalTime = (time: string) => {
    arrivalTime.value = time
  }

  const setReminderTime = (time: string) => {
    reminderTime.value = time
  }

  const addTripPoint = (point: { name: string }) => {
    tripPoints.value.push(point)
  }

  const updateTripPoint = (index: number, point: { name: string }) => {
    if (index >= 0 && index < tripPoints.value.length) {
      tripPoints.value[index] = point
    }
  }

  return {
    tripName,
    tripDate,
    arrivalTime,
    reminderTime,
    tripPoints,
    setTripName,
    setTripDate,
    setArrivalTime,
    setReminderTime,
    addTripPoint,
    updateTripPoint,
  }
})
