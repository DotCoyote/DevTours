<template>
  <div class="page">
    <search-input />

    <template v-if="availabilities.length">
      <search-filters />
      <search-results :items="availabilities" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from '@/store';
import { GetterTypes } from '@/store/types';

import SearchInput from '@/components/molecules/SearchInput.vue';

export default defineComponent({
  name: 'SearchPage',

  components: {
    SearchInput,
    SearchResults: defineAsyncComponent(() => import('@/components/organisms/SearchResults.vue')),
    SearchFilters: defineAsyncComponent(() => import('@/components/molecules/SearchFilters.vue')),
  },

  setup() {
    const store = useStore();

    const availabilities = computed(() => store.getters[GetterTypes.GET_AVAILABILITIES]);

    return {
      availabilities,
    };
  },
});
</script>
