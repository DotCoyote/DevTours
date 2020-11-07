<template>
  <router-link
    :to="{
      name: 'HotelDetails',
      params: {
        id: hotelData.id,
      },
      query: {
        ...searchData,
        ...filterData,
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

      <div class="flex flex-row space-between justify-center items-center mt-4">
        <div class="flex-grow leading-none">
          <div class="text-xl font-bold">
            {{ hotelData.price_per_night.amount }} {{ hotelData.price_per_night.currency }}
          </div>
          <div class="text-xs text-gray-600">
            price per night
          </div>
        </div>
        <span class="py-2 px-3 px-6 text-white bg-green-500 inline-block rounded">
          Details
      </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HotelWithPrices } from '@/typings/hotel.types';

export default defineComponent({
  props: {
    hotelData: {
      type: Object as () => HotelWithPrices,
      default: () => ({}),
    },
    searchData: {
      type: Object,
      default: () => ({}),
    },
    filterData: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
