<template>
  <!-- component -->
  <div
    class="flex flex-wrap items-center xl:h-screen"
    :class="{
      'md:flex-row-reverse': hotelData
    }"
  >
    <template v-if="hotelData">
      <div class="bg-gray-200 w-full h-64 md:w-1/2 md:h-screen">
        <img
          :src="hotelData.images[0].hires"
          class="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div class="bg-white w-full md:w-1/2 h-screen">
        <div class="mx-12 my-8 xl:mx-32">
          <alert v-if="errorMessage" type="error">{{ errorMessage }}</alert>

          <router-link to="/">&larr; back</router-link>

          <h1 class="text-3xl md:text-4xl xl:text-6xl font-bold mt-8">{{ hotelData.name }}</h1>

          <!-- description -->
          <div
            class="description w-full md:w-2/3 mt-10 text-gray-800 md:text-sm"
          >
            {{ hotelData.description }}
          </div>

          <!--      Choose room-->
          <form
            v-if="availableRooms && availableRooms.count > 0"
            @submit.prevent="bookRoom"
            class="mt-16"
          >
            <div>
              <label for="roomSelection">Select room:</label>
            </div>
            <select
              v-model="roomSelection"
              name="roomSelection"
              id="roomSelection"
            >
              <option :value="null" />
              <option
                v-for="availability in availableRooms.items"
                :key="availability.offer.id"
                :value="availability"
              >
                {{ availability.room.name }} ({{ availability.offer.line_items.final_price.amount }}
                {{ availability.offer.line_items.final_price.currency }})
              </option>
            </select>

            <button
              :disabled="!roomSelection"
              :class="{
                'bg-green-500': roomSelection,
                'bg-green-300 cursor-not-allowed': !roomSelection,
              }"
              class="
                py-2 px-3 mt-2 lg:mt-0 sm:ml-4 md:ml-0 lg:ml-4 px-6 text-white
                inline-block rounded
              "
              type="submit"
            >
              Book selection
            </button>
          </form>
          <div v-else class="text-red-700">No rooms available for your selection.</div>
        </div>
      </div>

    </template>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, defineAsyncComponent, reactive,
} from 'vue';
import router from '@/router';
import { useApi } from '@/utils/api';
import { Hotel, HotelRoom } from '@/typings/hotel.types';
import Loading from '@/components/atoms/Loading.vue';
import { useStore } from '@/store';
import { ActionTypes, GetterTypes } from '@/store/types';
import { getCurrentDate, getNextWeek } from '@/utils/date';
import { AvailabilityShortenedModel } from '@/typings/availability.types';
import { APIRoutes } from '@/typings/api.types';

export default defineComponent({
  name: 'hotel-details',

  components: {
    Loading,
    Alert: defineAsyncComponent(() => import('@/components/atoms/Alert.vue')),
  },

  setup() {
    const store = useStore();
    const { getHotelData, fetchApi } = useApi();
    const hotelData = ref<Hotel | null>(null);
    const errorMessage = ref('');
    const roomSelection = ref<AvailabilityShortenedModel | null>(null);
    const availableRooms = ref<AvailabilityShortenedModel[] | null>(null);

    const searchValues = reactive({
      startDate: router.currentRoute.value.query.startDate || getCurrentDate(),
      endDate: router.currentRoute.value.query.endDate || getNextWeek(),
      skip: 0,
      top: 999,
      hotelId: router.currentRoute.value.params.id,
    });

    function bookRoom() {
      if (!roomSelection.value || !hotelData.value) return;

      store.dispatch(ActionTypes.STORE_SELECTED_OFFER, roomSelection.value);

      router.push({ name: 'Booking' });
    }

    onMounted(async () => {
      if (!router.currentRoute.value.params.id) {
        router.push('/');
      }

      hotelData.value = store.getters[GetterTypes.GET_HOTEL_BY_ID](
        router.currentRoute.value.params.id,
      )
        || await getHotelData(router.currentRoute.value.params.id as string);

      const availableRoomsResponse = await fetchApi(APIRoutes.GET_AVAILABILITIES, {
        params: searchValues,
      });

      if (availableRoomsResponse?.data) {
        availableRooms.value = availableRoomsResponse.data;
      }
    });

    return {
      bookRoom,
      roomSelection,
      errorMessage,
      hotelData,
      availableRooms,
    };
  },
});
</script>
