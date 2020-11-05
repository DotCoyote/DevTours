import { GetterTree } from 'vuex';
import { AppState, FilterValues, GetterTypes } from '@/store/types';
import { SearchParams } from '@/typings/api.types';
import { Hotel } from '@/typings/hotel.types';

export type Getters<S = AppState> = {
  [GetterTypes.GET_SEARCH_VALUES](state: S): SearchParams;
  [GetterTypes.GET_AVAILABILITIES](state: S): Hotel[];
  [GetterTypes.GET_FILTER_VALUES](state: S): FilterValues;
}

export const getters: GetterTree<AppState, AppState> & Getters = {
  [GetterTypes.GET_SEARCH_VALUES]: (state: AppState) => state.searchValues,
  [GetterTypes.GET_AVAILABILITIES]: (state: AppState) => state.availabilities,
  [GetterTypes.GET_FILTER_VALUES]: (state: AppState) => state.filterValues,
};
