<template>
  <div class="h-screen flex flex-row justify-center items-center bg-gray-100">
    <!-- component -->
    <form
      v-if="!loading"
      class="
        container max-w-md mx-auto xl:max-w-3xl flex flex-row items-stretch bg-white
        rounded-lg shadow overflow-hidden
      "
      @submit.prevent="submitForm"
    >
      <div class="relative hidden xl:block xl:w-1/2">
        <img
          class="block h-full w-full object-cover"
          :src="hotelData.images[0].lowres"
          :alt="hotelData.name"
        />
      </div>
      <div class="w-full xl:w-1/2 p-8">
        <h1 class=" text-2xl font-bold">Book your room</h1>

        <div class="bg-gray-200 py-3 px-4 rounded mt-6">
          <div>
            <span class="text-gray-600 text-sm font-semibold">
              Hotel:
            </span>
              <span class="text-gray-700 text-sm">
              {{ hotelData.name }}
            </span>
          </div>
          <div>
            <span class="text-gray-600 text-sm font-semibold">
              Selected Room:
            </span>
              <span class="text-gray-700 text-sm">
              {{ selectedOffer.room.name }}
            </span>
          </div>
          <div>
            <span class="text-gray-600 text-sm font-semibold">
              Start-Date:
            </span>
              <span class="text-gray-700 text-sm">
              {{ startDate }}
            </span>
          </div>
          <div>
            <span class="text-gray-600 text-sm font-semibold">
              End-Date:
            </span>
              <span class="text-gray-700 text-sm">
              {{ endDate }}
            </span>
          </div>

<!--          Price Block-->

          <div class="border-t mt-3 pt-3 border-solid border-gray-600 flex space-between">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              Length of stay:
            </span>
              <span class="text-gray-700 text-sm block">
              {{ selectedOffer.availability.length_of_stay }} Nights
            </span>
          </div>
          <div class="flex space-between">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              Price per Night:
            </span>
              <span class="text-gray-700 text-sm">
              {{ selectedOffer.availability.price_per_night.amount }}
              {{ selectedOffer.availability.price_per_night.currency }}
            </span>
          </div>
          <div class="flex space-between">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              City tax:
            </span>
              <span class="text-gray-700 text-sm">
              {{ selectedOffer.offer.line_items.city_tax.amount }}
              {{ selectedOffer.offer.line_items.city_tax.currency }}
            </span>
          </div>
          <div class="flex space-between">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              Gross price:
            </span>
              <span class="text-gray-700 text-sm">
              {{ selectedOffer.offer.line_items.gross_price.amount }}
              {{ selectedOffer.offer.line_items.gross_price.currency }}
            </span>
          </div>
          <div class="flex space-between">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              VAT:
            </span>
              <span class="text-gray-700 text-sm">
              {{ selectedOffer.offer.line_items.vat.amount }}
              {{ selectedOffer.offer.line_items.vat.currency }}
            </span>
          </div>
          <div class="flex space-between border-t-2 border-solid border-gray-600 mt-3 pt-3">
            <span class="text-gray-600 text-sm font-semibold block flex-grow">
              Final Price:
            </span>
              <span class="text-gray-700 font-bold">
              {{ selectedOffer.offer.line_items.final_price.amount }}
              {{ selectedOffer.offer.line_items.final_price.currency }}
            </span>
          </div>

        </div>

        <div class="mb-4 mt-6">
          <div>
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="email"
            >
              Email
            </label>
          </div>
          <input
            v-model="formData.email"
            class="
              text-sm appearance-none rounded w-full py-2 px-3
              text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10
            "
            id="email"
            type="text"
            placeholder="Your email address"
          />
        </div>
        <div class="mb-6 mt-6">
          <div>
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="firstName"
            >
              First Name
            </label>
          </div>
          <input
            v-model="formData.firstName"
            class="
              text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3
              text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10
            "
            id="firstName"
            type="text"
            placeholder=""
          />
        </div>
        <div class="mb-6 mt-6">
          <div>
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="lastName"
            >
              Last Name
            </label>
          </div>
          <input
            v-model="formData.lastName"
            class="
              text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3
              text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10
            "
            id="lastName"
            type="text"
            placeholder=""
          />
        </div>
        <div class="flex w-full mt-8">
          <button
            class="
              w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4
              font-semibold rounded focus:outline-none focus:shadow-outline h-10
            "
            type="submit"
          >
            Book Room
          </button>
        </div>
      </div>
    </form>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, reactive, computed,
} from 'vue';
import router from '@/router';
import { Hotel } from '@/typings/hotel.types';
import { useApi } from '@/utils/api';
import Loading from '@/components/atoms/Loading.vue';
import { useStore } from '@/store';
import { ActionTypes, GetterTypes } from '@/store/types';

export default defineComponent({
  components: {
    Loading,
  },

  setup() {
    const store = useStore();

    const selectedOffer = computed(() => store.getters[GetterTypes.GET_SELECTED_OFFER]);

    const startDate = computed(
      () => new Date(store.getters[GetterTypes.GET_SEARCH_VALUES].startDate).toLocaleDateString(),
    );
    const endDate = computed(
      () => new Date(store.getters[GetterTypes.GET_SEARCH_VALUES].endDate).toLocaleDateString(),
    );

    const { getHotelData } = useApi();

    const loading = ref<boolean>(true);
    const hotelData = ref<Hotel | null>(null);
    const formData = reactive({
      email: '',
      firstName: '',
      lastName: '',
      hotelId: '',
      roomId: '',
    });

    function submitForm() {
      console.log(formData);
      store.dispatch(ActionTypes.STORE_SELECTED_OFFER, null);

      router.push('/');
    }

    async function getBookingInformation() {
      if (!selectedOffer.value) {
        router.push('/');
      }

      hotelData.value = store.getters[GetterTypes.GET_HOTEL_BY_ID](
        selectedOffer.value.hotelId,
      ) || await getHotelData(selectedOffer.value.hotelId);

      loading.value = false;
    }

    onMounted(async () => {
      getBookingInformation();
    });

    return {
      hotelData,
      submitForm,
      formData,
      startDate,
      endDate,
      loading,
      selectedOffer,
    };
  },
});
</script>
