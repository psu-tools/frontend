import { defineStore } from 'pinia'
import type { Point } from '~/stores/trips'

export const useAddTripFormStore = defineStore('addTripForm', () => {
  const tripName = ref<string>()
  const tripPoints = ref<Point[]>([])
  const tripDate = ref<Date | null>(null)
  const tripArrivingTime = ref<Date | null>(null)
  const tripReminderTime = ref<Date | null>(null)

  const addTripPoint = (point: Point) => tripPoints.value.push(point)

  return {
    tripName,
    tripPoints,
    tripDate,
    tripArrivingTime,
    tripReminderTime,
    addTripPoint,
  }
})
