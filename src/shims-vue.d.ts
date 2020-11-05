declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  import { AppState } from '@/store/types';
  import { Store } from 'vuex';

  const component: DefineComponent<{}, {}, any>;

  interface ComponentCustomProperties {
    $store: Store<AppState>;
  }

  export default component;
}
