import { Hotel } from '@/typings/hotel.types';
import { SearchParams } from '@/typings/api.types';

export interface AppState {
  searchValues: SearchParams;
  availabilities: Hotel[];
}

export enum MutationTypes {
  SET_SEARCH_VALUES = 'SET_SEARCH_VALUES',
  SET_AVAILABILITIES = 'SET_AVAILABILITIES',
}

export enum ActionTypes {
  STORE_SEARCH_VALUES = 'STORE_SEARCH_VALUES',
  STORE_AVAILABILITIES = 'STORE_AVAILABILITIES',
}

export enum GetterTypes {
  GET_SEARCH_VALUES = 'GET_SEARCH_VALUES',
  GET_AVAILABILITIES = 'GET_AVAILABILITIES',
}
