<template>
  <form
    @submit.prevent="submitForm"
    class="bg-gray-100 border border-solid border-gray-300 py-6 px-5 text-left">
    <alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </alert>

    <fieldset>
      <legend class="text-2xl">Hotel Search</legend>

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

      <button type="submit">Submit</button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useApi } from '@/utils/api';
import Alert from '@/components/atoms/Alert.vue';
import { Location } from '@/typings/location.types';
import { Hotel } from '@/typings/hotel.types';

export default defineComponent({
  components: {
    Alert,
  },

  setup(props, context) {
    const { fetchApi } = useApi();
    const searchLocation = ref<Location | null>(null);
    const locations = ref<Location[]>([]);
    const errorMessage = ref<string | null>(null);

    async function submitForm() {
      errorMessage.value = null;

      try {
        if (!searchLocation.value) {
          throw Error('No location selected!');
        }

        const response = await fetchApi('getHotels', {
          params: {
            location: searchLocation.value.id,
          },
        });

        if (response?.data) {
          // @ts-ignore
          context.emit('results-fetched', response.data as Hotel[]);
        }
      } catch (e) {
        console.error(e);
        errorMessage.value = e.message;
      }
    }

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

    onMounted(() => {
      fetchLocations();
    });

    return {
      errorMessage,
      locations,
      searchLocation,
      submitForm,
    };
  },
});

</script>

<style lang="scss">
input {
  @apply border-gray-400;
  border: 1px solid;
  border-radius: 3px;
}
</style>
