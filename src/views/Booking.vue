<template>
  <div class="h-screen flex flex-row justify-center items-center bg-gray-100">
    <!-- component -->
    <form
      v-if="hotelData"
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
              {{ roomData.name }}
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
  defineComponent, onMounted, ref, reactive,
} from 'vue';
import router from '@/router';
import { Hotel, HotelRoom } from '@/typings/hotel.types';
import { useApi } from '@/utils/api';
import Loading from '@/components/atoms/Loading.vue';

export default defineComponent({
  components: {
    Loading,
  },

  setup() {
    const { getHotelData } = useApi();
    const hotelData = ref<Hotel | null>(null);
    const roomData = ref<HotelRoom | null>(null);
    const formData = reactive({
      email: '',
      firstName: '',
      lastName: '',
      hotelId: '',
      roomId: '',
    });

    function submitForm() {
      console.log(formData);
    }

    async function getBookingInformation() {
      if (!router.currentRoute.value.query.roomId || !router.currentRoute.value.query.hotelId) {
        router.push('/');
      }

      hotelData.value = await getHotelData(router.currentRoute.value.query.hotelId as string);

      if (hotelData.value) {
        roomData.value = hotelData.value.rooms.find(
          (room: HotelRoom) => room.id === router.currentRoute.value.query.roomId,
        ) || null;

        formData.hotelId = hotelData.value.id;
        formData.roomId = roomData.value?.id || '';
      }
    }

    onMounted(async () => {
      getBookingInformation();
    });

    return {
      hotelData,
      roomData,
      submitForm,
      formData,
    };
  },
});
</script>
