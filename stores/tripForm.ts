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
      name: '',
      latitude: Number.POSITIVE_INFINITY,
      longitude: Number.POSITIVE_INFINITY,
      stopTime: 0,
      address: '',
    },
    {
      name: '',
      latitude: Number.POSITIVE_INFINITY,
      longitude: Number.POSITIVE_INFINITY,
      stopTime: 0,
      address: '',
    },
  ])

  const transportType = ref<TransportType>('WALK')

  const setTripName = (name: string) => (tripName.value = name)

  const setTripDate = (date: Date) => (tripDate.value = date)

  const setArrivalTime = (time: string) => (arrivalTime.value = time)

  const setReminderTime = (time: number) => (reminderTime.value = time)

  const setTransportType = (transport: TransportType) => (transportType.value = transport)

  const setPointStopTime = (pointIndex: number, time: number) =>
    (tripPoints.value[pointIndex].stopTime = time)

  const addTripPoint = (point: Point) => tripPoints.value.push(point)

  const updateTripPoint = (index: number, point: Point) => {
    if (index >= 0 && index < tripPoints.value.length) {
      tripPoints.value[index].name = point.name
      tripPoints.value[index].latitude = point.latitude
      tripPoints.value[index].longitude = point.longitude
      tripPoints.value[index].stopTime = 0
      tripPoints.value[index].address = point.address
      console.log('point index: ', index, 'point: ', tripPoints.value[index])
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
    setPointStopTime,
    addTripPoint,
    updateTripPoint,
    isFirstStepValid,
  }
})
