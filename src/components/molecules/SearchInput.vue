<template>
  <form
    @submit.prevent="submitForm"
    class="bg-gray-100 border border-solid border-gray-300 py-6 px-5 text-left">
    <alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </alert>

    <fieldset>
      <legend class="text-2xl">Hotel Search</legend>

      <div class="flex flex-row justify-between items-center">
        <!--      Location-->
        <div>
          <label for="searchLocation">Location:</label>
          <select id="searchLocation" v-model="searchLocation">
            <option />
            <option
              v-for="location in locations"
              :key="location.id"
              :value="location"
            >
              {{ location.name }}
            </option>
          </select>
        </div>

  <!--      Date-->
        <div>
          <label for="searchDateStart">Start-Date:</label>
          <input
            id="searchDateStart"
            type="date"
            v-model="searchDateStart"
          />
        </div>

        <div>
          <label for="searchDateEnd">End-Date:</label>
          <input id="searchDateEnd" type="date" v-model="searchDateEnd" />
        </div>

        <div>
          <label for="searchRating">Rating: </label>
          <select name="searchRating" id="searchRating" v-model.number="searchRating">
            <option v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :value="rating">
              {{ rating }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="
            py-2 px-3 px-6 text-white bg-green-500 hover:bg-green-700 inline-block rounded
          ">
          Submit
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useApi } from '@/utils/api';
import Alert from '@/components/atoms/Alert.vue';
import { Location } from '@/typings/location.types';
import { useStore } from '@/store';
import { ActionTypes, GetterTypes } from '@/store/types';

export default defineComponent({
  components: {
    Alert,
  },

  setup() {
    const { fetchApi } = useApi();
    const store = useStore();

    const searchLocation = ref<Location | null>(null);
    const searchDateStart = ref<string>('');
    const searchDateEnd = ref<string>('');
    const searchRating = ref<number>(1);
    const locations = ref<Location[]>([]);
    const errorMessage = ref<string | null>(null);

    async function submitForm() {
      errorMessage.value = null;

      try {
        if (!searchLocation.value) {
          throw Error('No location selected!');
        }

        const params = {
          location: searchLocation.value.id,
          startDate: new Date(searchDateStart.value).toISOString(),
          endDate: new Date(searchDateEnd.value).toISOString(),
          skip: 0,
          top: 99,
          rating: searchRating.value,
        };

        const response = await fetchApi('getHotels', {
          params,
        });

        store.dispatch(ActionTypes.STORE_SEARCH_VALUES, {
          ...params,
          location: searchLocation.value,
          startDate: new Date(searchDateStart.value).toISOString().substring(0, 10),
          endDate: new Date(searchDateEnd.value).toISOString().substring(0, 10),
        });

        if (response?.data) {
          store.dispatch(ActionTypes.STORE_AVAILABILITIES, response.data);
        }
      } catch (e) {
        console.error(e);
        errorMessage.value = e.message;
      }
    }

    // Fetch Locations
    async function fetchLocations() {
      try {
        const locationsResponse = await fetchApi('getLocations');

        // @ts-ignore
        if (locationsResponse?.data?.length) {
          // @ts-ignore
          locations.value = locationsResponse.data as Location[];
        }
      } catch (e) {
        console.error(e);
      }
    }

    function syncSearchParamsFromStore() {
      const storedSearchParams = store.getters[GetterTypes.GET_SEARCH_VALUES];

      console.log(storedSearchParams);

      searchLocation.value = storedSearchParams.location;
      searchRating.value = storedSearchParams.rating;
      searchDateStart.value = storedSearchParams.startDate;
      searchDateEnd.value = storedSearchParams.endDate;
    }

    onMounted(() => {
      syncSearchParamsFromStore();
      fetchLocations();
    });

    return {
      errorMessage,
      locations,
      searchLocation,
      searchDateStart,
      searchDateEnd,
      searchRating,
      submitForm,
    };
  },
});

</script>
