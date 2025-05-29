import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'
import { useTripsStore } from '~/stores/trips'

export const useTripFormStore = defineStore('tripForm', () => {
  const tripsStore = useTripsStore()

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

  const mergedDateTime = ref<string>()

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
      tripPoints.value.every(point => point.name?.trim() !== '' && point.address.trim() !== '') &&
      tripPoints.value.length >= 2 &&
      tripPoints.value[1].name?.trim() !== '' &&
      tripName.value !== ''
    )
  })

  const isFormValid = computed(() => {
    return transportType && isFirstStepValid
  })

  const mergeDateTime = () => {
    const year = tripDate.value.getFullYear()
    const month = String(tripDate.value.getMonth() + 1).padStart(2, '0')
    const day = String(tripDate.value.getDate()).padStart(2, '0')

    const dateTimeLocal = `${year}-${month}-${day}T${arrivalTime.value}:00`

    mergedDateTime.value = new Date(dateTimeLocal).toISOString()
  }

  const sendForm = async () => {
    mergeDateTime()

    const payload = JSON.parse(
      JSON.stringify({
        route: tripPoints.value,
        transportType: [transportType.value],
        overtime: reminderTime.value,
        arrivalDateTime: mergedDateTime.value,
        name: tripName.value,
      })
    )

    console.log('payload:', JSON.stringify(payload, null, 2))

    try {
      const config = useRuntimeConfig()
      const data = await customFetch(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/trips`,
        {
          method: 'POST',
          body: payload,
        }
      )
      console.log(data)
      clearForm()
      await tripsStore.fetchTrips()
      return true
    } catch (e) {
      console.error(e)
      return false
    } finally {
    }
  }

  const clearForm = () => {
    tripName.value = ''
    tripDate.value = new Date()
    arrivalTime.value =
      String(new Date().getHours()).padStart(2, '0') +
      ':' +
      String(new Date().getMinutes()).padStart(2, '0')
    reminderTime.value = 10
    tripPoints.value = [
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
    ]
    transportType.value = 'WALK'
    mergedDateTime.value = ''
  }

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
    isFormValid,
    sendForm,
  }
})
