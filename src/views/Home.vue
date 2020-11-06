<template>
  <div class="page container mx-auto mt-4">

    <div class="lg:flex lg:flex-row xl:flex-wrap">
      <search-input
        class="lg:w-1/2 lg:mt-0 xl:w-full"
      />
      <search-filters
        v-if="availabilities.length"
        class="mt-6 lg:w-1/2 lg:ml-4 lg:mt-0 xl:mt-6 xl:ml-0 xl:w-full"
      />
    </div>

    <search-results v-if="availabilities.length" :items="availabilities" />
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
