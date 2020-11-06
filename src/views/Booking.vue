<template>
  <h1>Booking Page</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import router from '@/router';
import { Hotel } from '@/typings/hotel.types';
import { useApi } from '@/utils/api';

export default defineComponent({
  setup() {
    const { getHotelData } = useApi();
    const hotelData = ref<Hotel | null>(null);

    onMounted(async () => {
      if (!router.currentRoute.value.params.roomId || !router.currentRoute.value.params.hotelId) {
        router.push('/');
      }

      hotelData.value = await getHotelData(router.currentRoute.value.params.id as string);
    });
    console.log(router.currentRoute.value.params);
  },
});
</script>
