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
    const { data, error } = await useFetch<GetTripsListResponse>(
        'https://api.psu-tools.ru/routes-service/trips',
        { method: 'GET' }
    );

    if (error.value) {
        console.error('ёмаё, эрор!:', error.value);
        return [];
    }

    return data.value?.data || [];
}
