<template>
  <router-link
    :to="{
      name: 'HotelDetails',
      params: {
        id: hotelData.id
      }
    }"
    class="mt-6 border-t border-solid border-gray-300"
  >
    <h3>{{ hotelData.name }}</h3>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Hotel } from '@/typings/hotel.types';

export default defineComponent({
  props: {
    hotelData: {
      type: Object as () => Hotel,
      default: () => ({}),
    },
  },
});
</script>
