import { SearchParams } from '@/typings/api.types';
import {
  AvailabilitiesPaginatedModel,
  AvailabilityShortenedModel,
} from '@/typings/availability.types';
import { Hotel } from '@/typings/hotel.types';

export interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  freeWifi?: boolean;
  freeCancellation?: boolean;
  breakfastIncluded?: boolean;
}

export interface AppState {
  searchValues: SearchParams;
  availabilities: AvailabilitiesPaginatedModel | null;
  filterValues: FilterValues;
  hotels: Hotel[];
  selectedOffer: AvailabilityShortenedModel | null;
}

export enum MutationTypes {
  SET_SEARCH_VALUES = 'SET_SEARCH_VALUES',
  SET_AVAILABILITIES = 'SET_AVAILABILITIES',
  SET_FILTER_VALUES = 'SET_FILTER_VALUES',
  SET_HOTELS = 'SET_HOTELS',
  SET_SELECTED_OFFER = 'SET_SELECTED_OFFER',
}

export enum ActionTypes {
  STORE_SEARCH_VALUES = 'STORE_SEARCH_VALUES',
  STORE_AVAILABILITIES = 'STORE_AVAILABILITIES',
  STORE_FILTER_VALUES = 'STORE_FILTER_VALUES',
  STORE_HOTELS = 'STORE_HOTELS',
  STORE_SELECTED_OFFER = 'STORE_SELECTED_OFFER',
}

export enum GetterTypes {
  GET_SEARCH_VALUES = 'GET_SEARCH_VALUES',
  GET_AVAILABILITIES = 'GET_AVAILABILITIES',
  GET_FILTER_VALUES = 'GET_FILTER_VALUES',
  GET_HOTELS = 'GET_HOTELS',
  GET_HOTEL_BY_ID = 'GET_HOTEL_BY_ID',
  GET_SELECTED_OFFER = 'GET_SELECTED_OFFER',
  GET_AVAILABILITIES_COUNT = 'GET_AVAILABILITIES_COUNT',
}
