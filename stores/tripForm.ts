import { defineStore } from 'pinia'

export const useTripFormStore = defineStore('tripForm', () => {
  const tripName = ref<string>('')

  const tripDate = ref<Date>(new Date())

  const arrivalTime = ref<string>(String(new Date().getHours()).padStart(2, '0') + ':' + String(new Date().getMinutes()).padStart(2, '0'))

  const reminderTime = ref<number>(10)

  const tripPoints = ref<{ name: string }[]>([])

  const setTripName = (name: string) => tripName.value = name

  const setTripDate = (date: Date) => tripDate.value = date

  const setArrivalTime = (time: string) => arrivalTime.value = time

  const setReminderTime = (time: number) => reminderTime.value = time

  const addTripPoint = (point: { name: string }) => tripPoints.value.push(point)

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
