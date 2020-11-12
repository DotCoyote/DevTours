<template>
  <div class="page container mx-auto mt-4">

    <div class="lg:flex lg:flex-row xl:flex-wrap">
      <search-input
        class="lg:w-1/2 lg:mt-0 xl:w-full"
      />
      <search-filters
        v-if="searchResults.length"
        class="mt-6 lg:w-1/2 lg:ml-4 lg:mt-0 xl:mt-6 xl:ml-0 xl:w-full"
      />
    </div>

    <search-results
      v-if="searchResults.length"
      :availabilities="searchResults"
      :items-count="itemsFound"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from '@/store';
import { GetterTypes } from '@/store/types';

import SearchInput from '@/components/molecules/SearchInput.vue';
import { Hotel, HotelWithPrices } from '@/typings/hotel.types';
import { AvailabilityShortenedModel, PriceEntryModel } from '@/typings/availability.types';

export default defineComponent({
  name: 'SearchPage',

  components: {
    SearchInput,
    SearchResults: defineAsyncComponent(() => import('@/components/organisms/SearchResults.vue')),
    SearchFilters: defineAsyncComponent(() => import('@/components/molecules/SearchFilters.vue')),
  },

  setup() {
    const store = useStore();

    const hotels = computed(() => store.getters[GetterTypes.GET_HOTELS]);
    const availabilities = computed(() => store.getters[GetterTypes.GET_AVAILABILITIES]);
    const itemsFound = computed(() => store.getters[GetterTypes.GET_AVAILABILITIES_COUNT]);

    function getLowestPriceFromAvailability(
      hotelAvailabilities: AvailabilityShortenedModel[],
    ): PriceEntryModel {
      if (hotelAvailabilities.length === 1) {
        return hotelAvailabilities[0].availability.price_per_night;
      }

      let lowest = Number.POSITIVE_INFINITY;
      // const highest = Number.NEGATIVE_INFINITY;
      let lowestPriceItem: PriceEntryModel | null = null;
      let tmp;

      hotelAvailabilities.forEach((availabilityItem: AvailabilityShortenedModel) => {
        tmp = availabilityItem.availability.price_per_night.amount;
        if (tmp < lowest) {
          lowest = tmp;
          lowestPriceItem = availabilityItem.availability.price_per_night;
        }
        // if (tmp > highest) highest = tmp;
      });

      return lowestPriceItem || {
        amount: 0,
        currency: '',
      };
    }

    const searchResults = computed<HotelWithPrices[]>(() => hotels.value.map((hotel: Hotel) => {
      const matchingAvailabilities = availabilities.value.items.filter(
        (availability: AvailabilityShortenedModel) => availability.hotelId === hotel.id,
      );
      if (!matchingAvailabilities) return false;
      const lowestPrice = getLowestPriceFromAvailability(matchingAvailabilities);
      return {
        ...hotel,
        // eslint-disable-next-line @typescript-eslint/camelcase
        price_per_night: lowestPrice,
      };
    }));

    return {
      searchResults,
      itemsFound,
    };
  },
});
</script>
