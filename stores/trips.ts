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
  const trips = ref<Trip[]>([])
  const isLoading = ref(false)

  const fetchTrips = async () => {
    try {
      isLoading.value = true
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
      month: 'long'
    })

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  return { trips, isLoading, fetchTrips, activeTrips, upcomingTrips, formatTime, formatDate }
})
