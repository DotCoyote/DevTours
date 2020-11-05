<template>
  <div class="mt-6">
    <div class="hotel-list">
      <hotel-list-item
        v-for="item in items"
        :key="item.id"
        :hotel-data="item"
      />
    </div>
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

<style lang="scss">
.hotel-list {
  display: grid;
  grid-gap: 30px;

  @screen xl {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
