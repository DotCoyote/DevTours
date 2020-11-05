<template>
  <div class="mt-6">
    <h3>Search results</h3>

    <hotel-list-item
      v-for="item in items"
      :key="item.id"
      :hotel-data="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Hotel } from '@/typings/hotel.types';
import HotelListItem from '@/components/molecules/HotelListItem.vue';

export default defineComponent({
  components: {
    HotelListItem,
  },

  props: {
    items: {
      type: Array as () => Hotel[],
      default: () => [],
    },
  },
});
</script>
