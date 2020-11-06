<template>
  <div class="mt-6">
<!--    Only checks rooms without filter for hotels (wifi, etc.)-->
<!--    <div class="text-center py-4">-->
<!--      <div-->
<!--        class="-->
<!--          border border-solid border-gray-300 bg-gray-100 rounded-full inline-block text-sm-->
<!--          px-4 py-2-->
<!--      ">-->
<!--        {{ itemsCount }} items found-->
<!--      </div>-->
<!--    </div>-->
    <div v-if="hotelItems.length" class="hotel-list">
      <hotel-list-item
        v-for="item in hotelItems"
        :key="item.id"
        :hotel-data="item"
        :filter-data="filterValues"
        :search-data="searchValues"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, watch, ref,
} from 'vue';
import { Hotel } from '@/typings/hotel.types';
import HotelListItem from '@/components/molecules/HotelListItem.vue';
import { useStore } from '@/store';
import { FilterValues, GetterTypes } from '@/store/types';

export default defineComponent({
  components: {
    HotelListItem,
  },

  props: {
    availabilities: {
      type: Array as () => Hotel[],
      default: () => [],
    },
    itemsCount: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const store = useStore();
    const filterValues = computed(() => store.getters[GetterTypes.GET_FILTER_VALUES]);
    const searchValues = computed(() => store.getters[GetterTypes.GET_SEARCH_VALUES]);
    const hotelItems = ref<Hotel[]>(props.availabilities);

    function setHotelItems(filters: FilterValues) {
      hotelItems.value = props.availabilities.filter(
        (hotel: Hotel) => (
          !filters.breakfastIncluded
            || (filters.breakfastIncluded && hotel.amenities.breakfast_included)
        )
            && (!filters.freeWifi
              || (filters.freeWifi && hotel.amenities.free_wifi)
            )
            && (!filters.freeCancellation
              || (filters.freeCancellation && hotel.amenities.free_cancellation)
            ),
      );
    }

    watch(() => filterValues.value, (newVal) => {
      setHotelItems(newVal);
    });

    return {
      hotelItems,
      filterValues,
      searchValues,
    };
  },
});
</script>

<style lang="scss">
.hotel-list {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr;

  @screen md {
    grid-template-columns: 1fr 1fr;
  }

  @screen xl {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
