import { Hotel } from '@/typings/hotel.types';
import { ActionContext, ActionTree } from 'vuex';
import {
  ActionTypes, AppState, FilterValues, MutationTypes,
} from '@/store/types';
import { SearchParams } from '@/typings/api.types';

export type Actions<S = ActionContext<AppState, AppState>> = {
  [ActionTypes.STORE_SEARCH_VALUES](state: S, payload: SearchParams): void;
  [ActionTypes.STORE_AVAILABILITIES](state: S, payload: Hotel[]): void;
  [ActionTypes.STORE_FILTER_VALUES](state: S, payload: FilterValues): void;
}

export const actions: ActionTree<AppState, AppState> & Actions = {
  [ActionTypes.STORE_SEARCH_VALUES]({ commit }, payload: SearchParams) {
    commit(MutationTypes.SET_SEARCH_VALUES, payload);
  },

  [ActionTypes.STORE_AVAILABILITIES]({ commit }, payload: Hotel[]) {
    commit(MutationTypes.SET_AVAILABILITIES, payload);
  },

  [ActionTypes.STORE_FILTER_VALUES]({ commit }, payload: FilterValues) {
    commit(MutationTypes.SET_FILTER_VALUES, payload);
  },
};
