export interface ApiResponse {
  [key: string]: any;
}

export enum APIRoutes {
  GET_HOTELS = 'getHotels',
  GET_LOCATIONS = 'getLocations',
  GET_AVAILABILITIES = 'getAvailabilities',
}

export interface SearchParams {
  location: string;
  startDate: string;
  endDate: string;
  skip: number;
  top: number;
  rating: number;
}
