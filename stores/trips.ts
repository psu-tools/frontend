import { defineStore } from 'pinia'

export interface Point {
  name?: string
  latitude: number
  longitude: number
  stopTime?: number
}

export type TransportType = 'CAR' | 'TAXI' | 'WALK' | 'BICYCLE' | 'SCOOTER' | 'PUBLIC_TRANSPORT'
export type TripStatus = 'past' | 'active' | 'upcoming'

export interface Trip {
  id: string
  name: string
  userId: string
  route: Point[]
  transportType: TransportType
  overtime: number
  status: TripStatus
  arrivalDateTime: string
  departureDateTime: string
}

export interface PagingResponse {
  sorted: boolean
  pageNumber: number
  numberOfElements: number
  totalElement: number
  last: boolean
}

export interface GetTripsListResponse {
  success: boolean
  data: Trip[]
  paging: PagingResponse
}

export const useTripsStore = defineStore('trips', () => {
  const selectedDate = ref<Date | null>(new Date())
  const trips = ref<Trip[]>([])
  const isLoading = ref(true)

  const fetchTrips = async () => {
    try {
      isLoading.value = true
      console.log(isLoading.value)
      const config = useRuntimeConfig()
      const response = await $fetch<GetTripsListResponse>(
        `${config.public.apiHost}/v1/routes-service/trips`,
        { method: 'GET' }
      )
      console.log('Response:', response)
      trips.value = response?.data || []
    } catch (error) {
      console.error('Data (trips) fetch error:', error)
      trips.value = []
    } finally {
      isLoading.value = false
    }
  }

  const activeTrips = computed(() => trips.value.filter(trip => trip.status === 'active'))
  const upcomingTrips = computed(() => trips.value.filter(trip => trip.status === 'upcoming'))

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const setSelectedDate = (date: Date | null) =>
    (selectedDate.value = date ? new Date(date.setHours(0, 0, 0, 0)) : new Date())

  const filteredTrips = computed(() => {
    if (!selectedDate.value) return trips.value
    return trips.value.filter(trip => {
      const tripDate = new Date(trip.departureDateTime)
      tripDate.setHours(0, 0, 0, 0)
      const selected = new Date(selectedDate.value!)
      selected.setHours(0, 0, 0, 0)
      return tripDate.getTime() === selected.getTime()
    })
  })

  const sortedFilteredTrips = computed(() => {
    return [...filteredTrips.value].sort((a, b) => {
      return new Date(a.departureDateTime).getTime() - new Date(b.departureDateTime).getTime()
    })
  })

  return {
    trips,
    isLoading,
    fetchTrips,
    activeTrips,
    upcomingTrips,
    formatTime,
    formatDate,
    selectedDate,
    setSelectedDate,
    filteredTrips: sortedFilteredTrips,
  }
})
