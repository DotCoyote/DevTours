<template>
  <router-link
    :to="{
      name: 'HotelDetails',
      params: {
        id: hotelData.id
      }
    }"
    class="bg-gray-200 rounded"
  >
    <div class="h-56 overflow-hidden object-cover rounded-tr rounded-tl">
      <img :src="hotelData.images[0].lowres" :alt="hotelData.name">
    </div>
    <div class="p-5">
      <h1 class="text-2xl font-bold text-green-800 py-2">{{ hotelData.name }}</h1>
      <p class="text-sm text-black">{{ hotelData.description }}</p>
      <span class="py-2 px-3 mt-4 px-6 text-white bg-green-500 inline-block rounded">
        Details
      </span>
    </div>
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
