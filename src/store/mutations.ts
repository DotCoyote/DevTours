import { AppState, FilterValues, MutationTypes } from '@/store/types';
import { SearchParams } from '@/typings/api.types';
import { MutationTree } from 'vuex';
import {
  AvailabilitiesPaginatedModel,
  AvailabilityShortenedModel,
} from '@/typings/availability.types';
import { Hotel } from '@/typings/hotel.types';

export type Mutations<S = AppState> = {
  [MutationTypes.SET_SEARCH_VALUES](state: S, payload: SearchParams): void;
  [MutationTypes.SET_AVAILABILITIES](state: S, payload: AvailabilitiesPaginatedModel): void;
  [MutationTypes.SET_FILTER_VALUES](state: S, payload: FilterValues): void;
  [MutationTypes.SET_HOTELS](state: S, payload: Hotel[]): void;
  [MutationTypes.SET_SELECTED_OFFER](state: S, payload: AvailabilityShortenedModel | null): void;
}

export const mutations: MutationTree<AppState> & Mutations = {
  [MutationTypes.SET_SEARCH_VALUES](state, payload: SearchParams) {
    state.searchValues = payload;
  },

  [MutationTypes.SET_AVAILABILITIES](state, payload: AvailabilitiesPaginatedModel) {
    state.availabilities = payload;
  },

  [MutationTypes.SET_FILTER_VALUES](state, payload: FilterValues) {
    state.filterValues = payload;
  },

  [MutationTypes.SET_HOTELS](state, payload: Hotel[]) {
    state.hotels = payload;
  },

  [MutationTypes.SET_SELECTED_OFFER](state, payload: AvailabilityShortenedModel | null) {
    state.selectedOffer = payload;
  },
};
