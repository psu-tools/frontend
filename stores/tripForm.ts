import { defineStore } from 'pinia'

export const useTripFormStore = defineStore('tripForm', () => {
  const tripName = ref<string>('')

  const tripDate = ref<Date>(new Date())

  const arrivalTime = ref<string>(
    String(new Date().getHours()).padStart(2, '0') +
      ':' +
      String(new Date().getMinutes()).padStart(2, '0')
  )

  const reminderTime = ref<number>(10)

  const tripPoints = ref<{ name: string }[]>([
    { name: 'Моё местоположение' },
    { name: 'Куда поедем?' },
  ])

  const setTripName = (name: string) => (tripName.value = name)

  const setTripDate = (date: Date) => (tripDate.value = date)

  const setArrivalTime = (time: string) => (arrivalTime.value = time)

  const setReminderTime = (time: number) => (reminderTime.value = time)

  const addTripPoint = (point: { name: string }) => tripPoints.value.push(point)

  const updateTripPoint = (index: number, point: { name: string }) => {
    if (index >= 0 && index < tripPoints.value.length) {
      tripPoints.value[index] = point
    }
  }

  const isFirstStepValid = computed(() => {
    return (
      tripName.value !== '' &&
      tripPoints.value.length >= 2 &&
      tripPoints.value[1].name.trim() !== '' &&
      tripPoints.value[1].name !== 'Куда поедем?'
    )
  })

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
    isFirstStepValid,
  }
})
