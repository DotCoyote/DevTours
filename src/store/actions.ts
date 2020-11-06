import { ActionContext, ActionTree } from 'vuex';
import {
  ActionTypes, AppState, FilterValues, MutationTypes,
} from '@/store/types';
import { SearchParams } from '@/typings/api.types';
import {
  AvailabilitiesPaginatedModel,
  AvailabilityShortenedModel,
} from '@/typings/availability.types';
import { Hotel } from '@/typings/hotel.types';

export type Actions<S = ActionContext<AppState, AppState>> = {
  [ActionTypes.STORE_SEARCH_VALUES](state: S, payload: SearchParams): void;
  [ActionTypes.STORE_AVAILABILITIES](state: S, payload: AvailabilitiesPaginatedModel[]): void;
  [ActionTypes.STORE_FILTER_VALUES](state: S, payload: FilterValues): void;
  [ActionTypes.STORE_HOTELS](state: S, payload: Hotel[]): void;
  [ActionTypes.STORE_SELECTED_OFFER](state: S, payload: AvailabilityShortenedModel | null): void;
}

export const actions: ActionTree<AppState, AppState> & Actions = {
  [ActionTypes.STORE_SEARCH_VALUES]({ commit }, payload: SearchParams) {
    commit(MutationTypes.SET_SEARCH_VALUES, payload);
  },

  [ActionTypes.STORE_AVAILABILITIES]({ commit }, payload: AvailabilitiesPaginatedModel[]) {
    commit(MutationTypes.SET_AVAILABILITIES, payload);
  },

  [ActionTypes.STORE_FILTER_VALUES]({ commit }, payload: FilterValues) {
    commit(MutationTypes.SET_FILTER_VALUES, payload);
  },

  [ActionTypes.STORE_HOTELS]({ commit }, payload: Hotel[]) {
    commit(MutationTypes.SET_HOTELS, payload);
  },

  [ActionTypes.STORE_SELECTED_OFFER]({ commit }, payload: AvailabilityShortenedModel | null) {
    commit(MutationTypes.SET_SELECTED_OFFER, payload);
  },
};
