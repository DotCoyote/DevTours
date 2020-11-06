<template>
  <!-- component -->
  <div class="flex flex-wrap md items-center h-screen">
    <template v-if="hotelData">
      <div class="bg-white w-full md:w-1/2 h-screen">
        <div class="mx-12 my-8 xl:mx-32">
          <alert v-if="errorMessage" type="error">{{ errorMessage }}</alert>

          <router-link to="/">&larr; back</router-link>

          <h1 class="text-6xl font-bold mt-8">{{ hotelData.name }}</h1>

          <!-- description -->
          <div
            class="description w-full sm: md:w-2/3 mt-10 text-gray-800 text-sm"
          >
            {{ hotelData.description }}
          </div>

          <!--      Choose room-->
          <form @submit.prevent="bookRoom" class="mt-16">
            <label for="roomSelection">Select room:</label>
            <select
              name="roomSelection" id="roomSelection" v-model="roomSelection"
            >
              <option :value="null" />
              <option v-for="room in hotelData.rooms" :key="room.id" :value="room">
                {{room.name}}
              </option>
            </select>

            <button
              :disabled="!roomSelection"
              :class="{
                'bg-green-500': roomSelection,
                'bg-green-300 cursor-not-allowed': !roomSelection,
              }"
              class="py-2 px-3 ml-4 px-6 text-white  inline-block rounded"
              type="submit"
            >
              Book selection
            </button>
          </form>
        </div>
      </div>
      <div class="bg-gray-200 w-full md:w-1/2 h-screen">
        <img
          :src="hotelData.images[0].hires"
          class="h-full w-full object-cover"
          alt=""
        />
      </div>

    </template>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, defineAsyncComponent,
} from 'vue';
import router from '@/router';
import { useApi } from '@/utils/api';
import { Hotel, HotelRoom } from '@/typings/hotel.types';
import Loading from '@/components/atoms/Loading.vue';

export default defineComponent({
  name: 'hotel-details',

  components: {
    Loading,
    Alert: defineAsyncComponent(() => import('@/components/atoms/Alert.vue')),
  },

  setup() {
    const { getHotelData } = useApi();
    const hotelData = ref<Hotel | null>(null);
    const errorMessage = ref('');
    const roomSelection = ref<HotelRoom | null>(null);

    function bookRoom() {
      if (!roomSelection.value || !hotelData.value) return;

      router.push({
        name: 'Booking',
        query: {
          roomId: roomSelection.value.id,
          hotelId: hotelData.value.id,
        },
      });
    }

    onMounted(async () => {
      if (!router.currentRoute.value.params.id) {
        router.push('/');
      }

      hotelData.value = await getHotelData(router.currentRoute.value.params.id as string);
    });

    return {
      bookRoom,
      roomSelection,
      errorMessage,
      hotelData,
    };
  },
});
</script>
