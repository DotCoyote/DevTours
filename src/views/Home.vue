<template>
  <div class="page container mx-auto mt-4">
    <search-page />
  </div>
</template>

<script lang="ts">
import SearchPage from '@/components/organisms/SearchPage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    SearchPage,
  },
});
</script>
