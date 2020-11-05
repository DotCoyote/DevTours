<template>
  <div class="page">
    <search-input @results-fetched="setSearchResults" />
    <search-results :items="searchResults" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchInput from '@/components/molecules/SearchInput.vue';
import SearchResults from '@/components/organisms/SearchResults.vue';
import { Hotel } from '@/typings/hotel.types';

export default defineComponent({
  name: 'SearchPage',

  components: {
    SearchInput,
    SearchResults,
  },

  setup() {
    const searchResults = ref<Hotel[]>([]);

    function setSearchResults(results: Hotel[]) {
      searchResults.value = results;
    }

    return {
      setSearchResults,
      searchResults,
    };
  },
});
</script>
