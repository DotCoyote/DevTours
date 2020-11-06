<template>
  <div class="search-filters border border-solid border-gray-300 bg-gray-100 py-3 px-4">
    <div class="flex flex-row flex-wrap justify-between">
<!--      Min Price -->
      <div class="field-row">
        <label for="minPriceValue">Min-Price:</label>
        <input type="number" v-model.number="minPriceValue" id="minPriceValue" />
      </div>
      <div class="field-row">
        <label for="maxPriceValue">Max-Price:</label>
        <input type="number" v-model.number="maxPriceValue" id="maxPriceValue" />
      </div>

<!--      breakfast-->
      <div class="field-row">
        <label class="checkLabel">
          <input type="checkbox" v-model="breakfastValue">
          Breakfast included
        </label>
      </div>

<!--      cancellation-->
      <div class="field-row">
        <label class="checkLabel">
          <input type="checkbox" v-model="cancellationValue">
          free cancellation
        </label>
      </div>

<!--      wifi-->
      <div class="field-row">
        <label class="checkLabel">
          <input type="checkbox" v-model="wifiValue">
          free WiFi
        </label>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

export default defineComponent({
  name: 'search-filters',

  setup() {
    const store = useStore();

    const minPriceValue = ref<number>(0);
    const maxPriceValue = ref<number>(9999);
    const breakfastValue = ref<boolean>(false);
    const cancellationValue = ref<boolean>(false);
    const wifiValue = ref<boolean>(false);

    watchEffect(() => {
      store.dispatch(ActionTypes.STORE_FILTER_VALUES, {
        minPrice: minPriceValue.value,
        maxPrice: maxPriceValue.value,
        breakfastIncluded: breakfastValue.value,
        freeWifi: wifiValue.value,
        freeCancellation: cancellationValue.value,
      });
    });

    return {
      minPriceValue,
      maxPriceValue,
      breakfastValue,
      cancellationValue,
      wifiValue,
    };
  },
});
</script>

<style scoped>

</style>
