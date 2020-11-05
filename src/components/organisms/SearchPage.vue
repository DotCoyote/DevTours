<template>
  <div class="page">
    <search-input />
    <search-results :items="availabilities" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SearchInput from '@/components/molecules/SearchInput.vue';
import SearchResults from '@/components/organisms/SearchResults.vue';
import { useStore } from '@/store';
import { GetterTypes } from '@/store/types';

export default defineComponent({
  name: 'SearchPage',

  components: {
    SearchInput,
    SearchResults,
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
