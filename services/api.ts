export interface Point {
    name?: string;
    latitude: number;
    longitude: number;
    stopTime?: number;
}

export type TransportType =
  | 'CAR'
  | 'TAXI'
  | 'WALK'
  | 'BICYCLE'
  | 'SCOOTER'
  | 'PUBLIC_TRANSPORT';

export interface Trip {
    id: string;
    route: Point[];
    transportType: TransportType;
    overtime: number;
}

export interface PagingResponse {
    sorted: boolean;
    pageNumber: number;
    numberOfElements: number;
    totalElement: number;
    last: boolean;
}

export interface GetTripsListResponse {
    success: boolean;
    data: Trip[];
    paging: PagingResponse;
}

export async function fetchTrips(): Promise<Trip[]> {
    try {
        const config = useRuntimeConfig();
        const response = await $fetch<GetTripsListResponse>(`${config.public.apiHost}/routes-service/trips`, {
            method: 'GET'
        });

        return response?.data || [];
    } catch (error) {
        console.error('Data (trips) fetch error:', error);
        return [];
    }
}
