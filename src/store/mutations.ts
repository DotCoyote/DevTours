import { AppState, FilterValues, MutationTypes } from '@/store/types';
import { SearchParams } from '@/typings/api.types';
import { Hotel } from '@/typings/hotel.types';
import { MutationTree } from 'vuex';

export type Mutations<S = AppState> = {
  [MutationTypes.SET_SEARCH_VALUES](state: S, payload: SearchParams): void;
  [MutationTypes.SET_AVAILABILITIES](state: S, payload: Hotel[]): void;
  [MutationTypes.SET_FILTER_VALUES](state: S, payload: FilterValues): void;
}

export const mutations: MutationTree<AppState> & Mutations = {
  [MutationTypes.SET_SEARCH_VALUES](state, payload: SearchParams) {
    state.searchValues = payload;
  },

  [MutationTypes.SET_AVAILABILITIES](state, payload: Hotel[]) {
    state.availabilities = payload;
  },

  [MutationTypes.SET_FILTER_VALUES](state, payload: FilterValues) {
    state.filterValues = payload;
  },
};
