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

  const tripPoints = ref<Point[]>([
    {
      name: 'Моё местоположение',
      latitude: Number.POSITIVE_INFINITY,
      longitude: Number.POSITIVE_INFINITY,
      stopTime: Number.POSITIVE_INFINITY,
    },
    {
      name: 'Куда поедем?',
      latitude: Number.POSITIVE_INFINITY,
      longitude: Number.POSITIVE_INFINITY,
      stopTime: Number.POSITIVE_INFINITY,
    },
  ])

  const transportType = ref<TransportType>('WALK')

  const setTripName = (name: string) => (tripName.value = name)

  const setTripDate = (date: Date) => (tripDate.value = date)

  const setArrivalTime = (time: string) => (arrivalTime.value = time)

  const setReminderTime = (time: number) => (reminderTime.value = time)

  const setTransportType = (transport: TransportType) => (transportType.value = transport)

  const addTripPoint = (point: Point) => tripPoints.value.push(point)

  const updateTripPoint = (index: number, point: { name: string }) => {
    if (index >= 0 && index < tripPoints.value.length) {
      tripPoints.value[index].name = point.name
    }
  }

  const isFirstStepValid = computed(() => {
    return (
      tripPoints.value.length >= 2 &&
      tripPoints.value[1].name?.trim() !== '' &&
      tripPoints.value[1].name !== 'Куда поедем?'
    )
  })

  return {
    tripName,
    tripDate,
    arrivalTime,
    reminderTime,
    tripPoints,
    transportType,
    setTripName,
    setTripDate,
    setArrivalTime,
    setReminderTime,
    setTransportType,
    addTripPoint,
    updateTripPoint,
    isFirstStepValid,
  }
})
