import { Hotel } from '@/typings/hotel.types';
import { SearchParams } from '@/typings/api.types';

export interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  freeWifi?: boolean;
  freeCancellation?: boolean;
  breakfastIncluded?: boolean;
}

export interface AppState {
  searchValues: SearchParams;
  availabilities: Hotel[];
  filterValues: FilterValues;
}

export enum MutationTypes {
  SET_SEARCH_VALUES = 'SET_SEARCH_VALUES',
  SET_AVAILABILITIES = 'SET_AVAILABILITIES',
  SET_FILTER_VALUES = 'SET_FILTER_VALUES',
}

export enum ActionTypes {
  STORE_SEARCH_VALUES = 'STORE_SEARCH_VALUES',
  STORE_AVAILABILITIES = 'STORE_AVAILABILITIES',
  STORE_FILTER_VALUES = 'STORE_FILTER_VALUES',
}

export enum GetterTypes {
  GET_SEARCH_VALUES = 'GET_SEARCH_VALUES',
  GET_AVAILABILITIES = 'GET_AVAILABILITIES',
  GET_FILTER_VALUES = 'GET_FILTER_VALUES'
}
