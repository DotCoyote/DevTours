import { createLogger, createStore } from 'vuex';
import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins,
  modules: {
  },
});

export function useStore() {
  return store;
}
