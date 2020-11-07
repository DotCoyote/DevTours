<template>
  <div class="bg-gray-100 border border-solid border-gray-300 py-6 px-5 text-left">
    <form
      v-if="locations"
      @submit.prevent="submitForm"
    >
      <alert v-if="errorMessage" type="error">
        {{ errorMessage }}
      </alert>

      <fieldset>
        <legend class="text-2xl">Hotel Search</legend>

        <div class="flex flex-row flex-wrap justify-between items-center mt-6 xl:mt-0">
          <!--      Location-->
          <div class="field-row">
            <label for="searchLocation">Location:</label>
            <select
              v-model="searchLocation"
              id="searchLocation"
            >
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
          <div class="field-row">
            <label for="searchDateStart">Start-Date:</label>
            <input
              id="searchDateStart"
              type="date"
              v-model="searchDateStart"
            />
          </div>

          <div class="field-row">
            <label for="searchDateEnd">End-Date:</label>
            <input id="searchDateEnd" type="date" v-model="searchDateEnd" />
          </div>

          <div class="field-row">
            <label for="searchRating">Rating: </label>
            <select name="searchRating" id="searchRating" v-model.number="searchRating">
              <option v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :value="rating">
                {{ rating }}
              </option>
            </select>
          </div>

          <div class="w-full mt-4 xl:mt-0 xl:w-auto text-right">
            <button
              type="submit"
              class="
                py-2 px-3 px-6 text-white  inline-block rounded
              "
              :class="{
                'bg-green-500 hover:bg-green-700': !loading,
                'bg-green-300 cursor-not-allowed': loading,
              }"
              :disabled="loading"
            >
              {{ loading ? 'Loading...' : 'Submit' }}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useApi } from '@/utils/api';
import Alert from '@/components/atoms/Alert.vue';
import { Location } from '@/typings/location.types';
import { useStore } from '@/store';
import { ActionTypes, GetterTypes } from '@/store/types';
import Loading from '@/components/atoms/Loading.vue';
import { APIRoutes } from '@/typings/api.types';
import { AvailabilitiesPaginatedModel, AvailabilityShortenedModel } from '@/typings/availability.types';
import { Hotel } from '@/typings/hotel.types';

export default defineComponent({
  components: {
    Loading,
    Alert,
  },

  setup() {
    const { fetchApi, getHotelData } = useApi();
    const store = useStore();

    const searchLocation = ref<Location | null>(null);
    const searchDateStart = ref<string>('');
    const searchDateEnd = ref<string>('');
    const searchRating = ref<number>(1);
    const locations = ref<Location[] | null>(null);
    const errorMessage = ref<string | null>(null);
    const loading = ref<boolean>(false);

    function sortByName(itemA: Location, itemB: Location) {
      const nameA = itemA.name.toUpperCase();
      const nameB = itemB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    async function getHotelsToRooms(availabilities: AvailabilityShortenedModel[]) {
      const hotelIds = availabilities.reduce(
        (allIds: string[], currentAvailability: AvailabilityShortenedModel) => {
          if (!(currentAvailability.hotelId in allIds)) {
            allIds.push(currentAvailability.hotelId);
          }

          return allIds;
        }, [],
      );
      const requests: Promise<any>[] = [];

      hotelIds.forEach((id) => {
        requests.push(getHotelData(id));
      });

      const hotelDatas = await Promise.all(requests);

      // Store found Hotels
      store.dispatch(
        ActionTypes.STORE_HOTELS, hotelDatas as Hotel[],
      );
    }

    async function submitForm() {
      errorMessage.value = null;

      try {
        loading.value = true;

        const params = {
          location: searchLocation.value?.id || '',
          startDate: new Date(searchDateStart.value).toISOString(),
          endDate: new Date(searchDateEnd.value).toISOString(),
          skip: 0,
          top: 99,
          rating: searchRating.value,
        };

        const response = await fetchApi(APIRoutes.GET_AVAILABILITIES, {
          params,
        });

        // Keep search settings in the store
        store.dispatch(ActionTypes.STORE_SEARCH_VALUES, {
          ...params,
          location: searchLocation.value,
          startDate: new Date(searchDateStart.value).toISOString().substring(0, 10),
          endDate: new Date(searchDateEnd.value).toISOString().substring(0, 10),
        });

        if (response?.data) {
          // Keep availabilities in the store
          store.dispatch(
            ActionTypes.STORE_AVAILABILITIES, response.data as AvailabilitiesPaginatedModel,
          );

          getHotelsToRooms(response.data.items);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        errorMessage.value = e.message;
      } finally {
        loading.value = false;
      }
    }

    // Fetch Locations
    async function fetchLocations() {
      try {
        const locationsResponse = await fetchApi('getLocations');

        // @ts-ignore
        if (locationsResponse?.data?.length) {
          // @ts-ignore
          locations.value = (locationsResponse.data as Location[]).sort(sortByName);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    function syncSearchParamsFromStore() {
      const storedSearchParams = store.getters[GetterTypes.GET_SEARCH_VALUES];

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
      loading,
    };
  },
});

</script>
