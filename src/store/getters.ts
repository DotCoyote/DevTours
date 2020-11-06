import { GetterTree } from 'vuex';
import { AppState, FilterValues, GetterTypes } from '@/store/types';
import { SearchParams } from '@/typings/api.types';
import {
  AvailabilitiesPaginatedModel,
  AvailabilityShortenedModel,
} from '@/typings/availability.types';
import { Hotel } from '@/typings/hotel.types';

export type Getters<S = AppState> = {
  [GetterTypes.GET_SEARCH_VALUES](state: S): SearchParams;
  [GetterTypes.GET_AVAILABILITIES](state: S): AvailabilitiesPaginatedModel | null;
  [GetterTypes.GET_FILTER_VALUES](state: S): FilterValues;
  [GetterTypes.GET_HOTELS](state: S): Hotel[];
  [GetterTypes.GET_HOTEL_BY_ID](state: S): (hotelId: string) => Hotel | undefined;
  [GetterTypes.GET_SELECTED_OFFER](state: S): AvailabilityShortenedModel | null;
  [GetterTypes.GET_AVAILABILITIES_COUNT](state: S): number;
}

export const getters: GetterTree<AppState, AppState> & Getters = {
  [GetterTypes.GET_SEARCH_VALUES]: (state: AppState) => state.searchValues,
  [GetterTypes.GET_AVAILABILITIES]: (state: AppState) => state.availabilities,
  [GetterTypes.GET_AVAILABILITIES_COUNT]: (state: AppState) => state.availabilities?.count || 0,
  [GetterTypes.GET_FILTER_VALUES]: (state: AppState) => state.filterValues,
  [GetterTypes.GET_HOTELS]: (state: AppState) => state.hotels,
  [GetterTypes.GET_HOTEL_BY_ID]: (state: AppState) => (hotelId: string) => state.hotels.find(
    (hotel) => hotel.id === hotelId,
  ),
  [GetterTypes.GET_SELECTED_OFFER]: (state: AppState) => state.selectedOffer,
};
