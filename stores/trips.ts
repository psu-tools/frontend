import { defineStore } from 'pinia'
import { customFetch } from '@/utils/customFetch'

export interface Point {
  name?: string
  latitude: number
  longitude: number
  stopTime?: number
  address: string
}

export type TransportType = 'CAR' | 'TAXI' | 'WALK' | 'BICYCLE' | 'SCOOTER' | 'PUBLIC_TRANSPORT'
export type TripStatus = 'past' | 'active' | 'upcoming'

export type DisplayRouteTime = string

export interface Trip {
  id: string
  name: string
  userId: string
  route: Point[]
  transportType: TransportType[]
  overtime: number
  status: TripStatus
  arrivalDateTime: string
  departureDateTime: string
  displayRouteTimes: DisplayRouteTime[]
  routeTimes: number[]
  stopTimes: number[]
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

export interface DeleteTripResponse {
  success: boolean
  data: object
}

export const useTripsStore = defineStore('trips', () => {
  const selectedDate = ref<Date | null>(new Date())
  const trips = ref<Trip[]>([])
  const isLoading = ref(true)

  const fetchTrips = async () => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      const response = await customFetch<GetTripsListResponse>(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/trips`,
        { method: 'GET' }
      )
      trips.value = response?.data || []
      console.log(trips.value)
    } catch (error) {
      console.error('Data (trips) fetch error:', error)
      trips.value = []
    } finally {
      isLoading.value = false
    }
  }

  const deleteTrip = async (tripId: string) => {
    try {
      const config = useRuntimeConfig()
      const response = await customFetch<DeleteTripResponse>(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/trips/${tripId}`,
        { method: 'DELETE' }
      )
      console.log(response)
      fetchTrips()
    } catch (error) {
      console.error("The trip wasn't deleted:", error)
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
    deleteTrip,
    activeTrips,
    upcomingTrips,
    formatTime,
    formatDate,
    selectedDate,
    setSelectedDate,
    filteredTrips: sortedFilteredTrips,
  }
})
